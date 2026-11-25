import type { Preview } from '@storybook/react-vite'
import './storybook.css'
import paygenix from './theme-paygenix.css?inline'
import workspace from './theme-workspace.css?inline'

// One stylesheet per theme. To add a theme: add theme-<name>.css next to this
// file, import it here and list it below.
const themes: Record<string, { title: string; css: string }> = {
  workspace: { title: 'Workspace', css: workspace },
  paygenix: { title: 'PayGenix', css: paygenix },
}

function applyTheme(name: string) {
  let style = document.getElementById('theme-tokens')
  if (!style) {
    style = document.createElement('style')
    style.id = 'theme-tokens'
    document.head.appendChild(style)
  }
  if (style.dataset.theme === name) return
  style.dataset.theme = name
  style.textContent = (themes[name] ?? themes.workspace).css
}

const preview: Preview = {
  globalTypes: {
    theme: {
      description: 'Theme whose tokens the components are shown with',
      toolbar: {
        title: 'Theme',
        icon: 'paintbrush',
        items: Object.entries(themes).map(([value, { title }]) => ({ value, title })),
        dynamicTitle: true,
      },
    },
  },
  initialGlobals: { theme: 'workspace' },
  decorators: [
    (Story, context) => {
      applyTheme(context.globals.theme)
      return Story()
    },
  ],
  parameters: {
    layout: 'padded',
    controls: { expanded: true },
    options: {
      storySort: { order: ['Actions', 'Selection', 'Fields', 'Status', 'Identity', 'Navigation', 'Overlays', 'Feedback', 'Data', 'Layout'] },
    },
  },
}

export default preview
