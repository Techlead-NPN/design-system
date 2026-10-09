// Copies the token files into dist/tokens so the package carries them:
// foundations.css plus one <project>.css per folder in projects/.
import { cpSync, existsSync, mkdirSync, readdirSync } from 'node:fs'
import { join } from 'node:path'

const root = join(import.meta.dirname, '..', '..')
const out = join(import.meta.dirname, '..', 'dist', 'tokens')
mkdirSync(out, { recursive: true })

cpSync(join(root, 'foundations', 'tokens', 'foundations.css'), join(out, 'foundations.css'))
for (const project of readdirSync(join(root, 'projects'))) {
  const tokens = join(root, 'projects', project, 'tokens.css')
  if (existsSync(tokens)) cpSync(tokens, join(out, `${project}.css`))
}
