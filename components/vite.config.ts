import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'

// Library build for the published package. Storybook has its own Vite setup
// (.storybook/main.ts) and does not use this file.
export default defineConfig({
  plugins: [react()],
  build: {
    lib: { entry: 'src/index.ts', formats: ['es'], fileName: 'index' },
    // Class names must stay readable: the consuming app's Tailwind scans dist/.
    minify: false,
    rollupOptions: { external: ['react', 'react-dom', 'react/jsx-runtime'] },
  },
})
