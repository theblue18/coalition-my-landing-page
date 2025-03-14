import type { Preview } from '@storybook/react'
const ACCESS_TOKEN = process.env.NEXT_PUBLIC_CONTENTFUL_ACCESS_TOKEN;
const SPACE_ID = process.env.NEXT_PUBLIC_CONTENTFUL_SPACE_ID;
const preview: Preview = {
  parameters: {
    controls: {
      matchers: {
       color: /(background|color)$/i,
       date: /Date$/i,
      },
    },
    globals: {
      contentfulPreview: {
        space: SPACE_ID,
        accessToken: ACCESS_TOKEN,
        host: 'preview.contentful.com',
      }
    }
  },
};

export default preview;