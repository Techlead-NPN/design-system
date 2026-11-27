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

// Old paths, each importing its theme so apps importing the old path keep
// working: portal2.0.css and paygenix-merchant.css (package 0.6.0 and earlier,
// before the themes/ folder) and workspace.css (0.18.x and earlier, before the
// Classic theme was named after its look). Remove them in the next major version.
const aliases = { 'workspace.css': 'classic.css', 'portal2.0.css': 'classic.css', 'paygenix-merchant.css': 'paygenix.css' }
for (const [oldName, theme] of Object.entries(aliases)) {
  writeFileSync(
    join(out, oldName),
    `/* Deprecated: import tokens/${theme} instead. This alias will be removed in 1.0.0. */\n@import "./${theme}";\n`,
  )
}
