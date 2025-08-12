import type { Meta, StoryObj } from '@storybook/react';
import { SearchBar } from './search-bar';

const meta: Meta<typeof SearchBar> = {
  title: 'Components/SearchBar',
  component: SearchBar,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    onSearch: { action: 'searched' },
    isLoading: { control: { type: 'boolean' } },
  },
  decorators: [
    (Story) => (
      <div className="w-full max-w-2xl">
        <Story />
      </div>
    ),
  ],
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {},
};

export const Loading: Story = {
  args: {
    isLoading: true,
  },
};

export const WithInitialValue: Story = {
  args: {},
  parameters: {
    docs: {
      description: {
        story: 'The SearchBar component with an initial username value.',
      },
    },
  },
};

export const Disabled: Story = {
  args: {
    isLoading: true,
  },
  parameters: {
    docs: {
      description: {
        story: 'The SearchBar component in a disabled state while loading.',
      },
    },
  },
};
