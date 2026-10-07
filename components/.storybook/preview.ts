import type { Preview } from '@storybook/react-vite'
import './storybook.css'

const preview: Preview = {
  parameters: {
    layout: 'padded',
    controls: { expanded: true },
    options: {
      storySort: { order: ['Actions', 'Selection', 'Fields', 'Status', 'Identity', 'Navigation', 'Overlays', 'Feedback', 'Data', 'Layout'] },
    },
  },
}

export default preview
