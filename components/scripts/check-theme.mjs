#!/usr/bin/env node
// Checks that a theme defines every token the Workspace theme defines, so the
// components look right with it. See themes/CONTRACT.md.
//
//   node scripts/check-theme.mjs                  checks every theme in themes/
//   node scripts/check-theme.mjs my-theme.css     checks the given file(s)
//
// In an app that installs the package, the same check is:
//   npx ds-check-theme src/my-theme.css
//
// A theme passes when it has every CSS variable (`--name:`) and every
// `@utility` of the Workspace theme. Extra names are allowed. Exit code 1 if
// any theme is missing a name.
import { existsSync, readFileSync, readdirSync } from 'node:fs'
import { basename, join, resolve } from 'node:path'

const here = import.meta.dirname
// In this repo the script sits in components/scripts/; in the package it sits
// in dist/ next to dist/tokens/.
const repoThemes = join(here, '..', '..', 'themes')
const reference = [join(repoThemes, 'workspace.css'), join(here, 'tokens', 'workspace.css')].find(existsSync)
if (!reference) {
  console.error('check-theme: cannot find workspace.css to compare against.')
  process.exit(2)
}

function namesIn(file) {
  const css = readFileSync(file, 'utf8').replace(/\/\*[\s\S]*?\*\//g, '')
  const vars = new Set([...css.matchAll(/(?:^|[\s;{])(--[a-zA-Z0-9_-]+)\s*:/g)].map((m) => m[1]))
  const utilities = new Set([...css.matchAll(/@utility\s+([a-zA-Z0-9_-]+)/g)].map((m) => m[1]))
  return { vars, utilities }
}

let files = process.argv.slice(2).map((f) => resolve(f))
if (files.length === 0) {
  if (!existsSync(repoThemes)) {
    console.error('Usage: ds-check-theme <theme.css> [more.css ...]')
    process.exit(2)
  }
  files = readdirSync(repoThemes)
    .filter((f) => f.endsWith('.css'))
    .map((f) => join(repoThemes, f))
    .filter((f) => resolve(f) !== resolve(reference))
}

const ref = namesIn(reference)
let failed = false
for (const file of files) {
  if (!existsSync(file)) {
    console.error(`✗ ${file}: file not found`)
    failed = true
    continue
  }
  const theme = namesIn(file)
  const missingVars = [...ref.vars].filter((n) => !theme.vars.has(n))
  const missingUtilities = [...ref.utilities].filter((n) => !theme.utilities.has(n))
  const extra = [...theme.vars].filter((n) => !ref.vars.has(n)).length
  const name = basename(file)
  if (missingVars.length + missingUtilities.length === 0) {
    console.log(`✓ ${name}: has all ${ref.vars.size} variables and ${ref.utilities.size} utilities of workspace.css${extra ? ` (+${extra} of its own)` : ''}`)
    continue
  }
  failed = true
  console.error(`✗ ${name}: missing ${missingVars.length + missingUtilities.length} of workspace.css's names`)
  for (const n of missingVars) console.error(`    ${n}`)
  for (const n of missingUtilities) console.error(`    @utility ${n}`)
}
process.exit(failed ? 1 : 0)
