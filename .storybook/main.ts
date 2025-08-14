import type { StorybookConfig } from '@storybook/react-vite';
import path from 'path';

const config: StorybookConfig = {
  stories: ['../src/**/*.stories.@(js|jsx|mjs|ts|tsx)'],
  addons: ['@storybook/addon-docs', '@storybook/addon-a11y'],
  framework: {
    name: '@storybook/react-vite',
    options: {},
  },
  viteFinal: async config => {
    // Ensure we have a clean config without React Router
    const cleanConfig = {
      ...config,
      plugins: [],
      resolve: {
        alias: {
          '@': path.resolve(__dirname, '../src'),
        },
      },
    };

    return cleanConfig;
  },
};

export default config;
