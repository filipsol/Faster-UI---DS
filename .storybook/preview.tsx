import type { Preview } from '@storybook/react-vite'
import '../src/index.css'

const preview: Preview = {
  parameters: {
    controls: {
      matchers: {
       color: /(background|color)$/i,
       date: /Date$/i,
      },
    },
    a11y: {
      // Fail CI on accessibility violations detected by the a11y addon.
      test: 'error',
    },
    layout: 'centered',
  },
};

export default preview;
