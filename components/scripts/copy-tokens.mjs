// Copies the token files into dist/tokens so the package carries them:
// foundations.css plus one <theme>.css per file in themes/.
import { cpSync, mkdirSync, readdirSync, writeFileSync } from 'node:fs'
import { join } from 'node:path'

const root = join(import.meta.dirname, '..', '..')
const out = join(import.meta.dirname, '..', 'dist', 'tokens')
mkdirSync(out, { recursive: true })

cpSync(join(root, 'foundations', 'tokens', 'foundations.css'), join(out, 'foundations.css'))
for (const file of readdirSync(join(root, 'themes'))) {
  if (file.endsWith('.css')) cpSync(join(root, 'themes', file), join(out, file))
}

// Old paths from before the themes/ folder (package 0.6.0 and earlier). Each
// imports its theme, so apps importing the old path keep working. Remove them
// in the next major version.
const aliases = { 'portal2.0.css': 'workspace.css', 'paygenix-merchant.css': 'paygenix.css' }
for (const [oldName, theme] of Object.entries(aliases)) {
  writeFileSync(
    join(out, oldName),
    `/* Deprecated: import tokens/${theme} instead. This alias will be removed in 1.0.0. */\n@import "./${theme}";\n`,
  )
}
