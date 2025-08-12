import type { Meta, StoryObj } from '@storybook/react';
import { Filters } from './filters';

const meta: Meta<typeof Filters> = {
  title: 'Components/Filters',
  component: Filters,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  decorators: [
    (Story) => (
      <div className="w-full max-w-4xl">
        <Story />
      </div>
    ),
  ],
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    availableLanguages: ['TypeScript', 'JavaScript', 'Python', 'Go', 'Rust'],
  },
};

export const WithManyLanguages: Story = {
  args: {
    availableLanguages: [
      'TypeScript', 'JavaScript', 'Python', 'Go', 'Rust', 'C++', 'Java',
      'C#', 'PHP', 'Ruby', 'Swift', 'Kotlin', 'Dart', 'Elixir'
    ],
  },
};

export const SingleLanguage: Story = {
  args: {
    availableLanguages: ['TypeScript'],
  },
};

export const NoLanguages: Story = {
  args: {
    availableLanguages: [],
  },
};

export const WithActiveFilters: Story = {
  args: {
    availableLanguages: ['TypeScript', 'JavaScript', 'Python'],
  },
  parameters: {
    docs: {
      description: {
        story: 'The Filters component with active name and language filters.',
      },
    },
  },
};
