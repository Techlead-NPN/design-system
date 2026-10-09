import type { Preview } from '@storybook/react-vite'
import './storybook.css'
import paygenixMerchant from './project-paygenix-merchant.css?inline'
import portal from './project-portal2.0.css?inline'

// One stylesheet per project. To add a project: add project-<name>.css next to
// this file, import it here and list it below.
const projects: Record<string, { title: string; css: string }> = {
  'portal2.0': { title: 'Portal 2.0', css: portal },
  'paygenix-merchant': { title: 'PayGenix Merchant', css: paygenixMerchant },
}

function applyProject(name: string) {
  let style = document.getElementById('project-tokens')
  if (!style) {
    style = document.createElement('style')
    style.id = 'project-tokens'
    document.head.appendChild(style)
  }
  if (style.dataset.project === name) return
  style.dataset.project = name
  style.textContent = projects[name].css
}

const preview: Preview = {
  globalTypes: {
    project: {
      description: 'Project whose tokens the components are shown with',
      toolbar: {
        title: 'Project',
        icon: 'paintbrush',
        items: Object.entries(projects).map(([value, { title }]) => ({ value, title })),
        dynamicTitle: true,
      },
    },
  },
  initialGlobals: { project: 'portal2.0' },
  decorators: [
    (Story, context) => {
      applyProject(context.globals.project)
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
