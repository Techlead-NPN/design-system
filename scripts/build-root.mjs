// Root packaging build: install + build components/, copy dist to the repo root.
// Runs via `prepare` when this repo is installed as a git dependency. The `pkg`
// branch also carries a committed dist, so installs work even where lifecycle
// scripts are skipped (bun untrusted deps).
import { execSync } from 'node:child_process'
import { cpSync, existsSync, rmSync } from 'node:fs'

execSync('npm ci --ignore-scripts', { cwd: 'components', stdio: 'inherit' })
execSync('npm run build', { cwd: 'components', stdio: 'inherit' })
rmSync('dist', { recursive: true, force: true })
cpSync('components/dist', 'dist', { recursive: true })
console.log('root dist ready:', existsSync('dist/index.js'))
