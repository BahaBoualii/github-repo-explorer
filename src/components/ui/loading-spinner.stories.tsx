import type { Meta, StoryObj } from '@storybook/react';
import { LoadingSpinner } from './loading-spinner';

const meta: Meta<typeof LoadingSpinner> = {
  title: 'UI/LoadingSpinner',
  component: LoadingSpinner,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    size: {
      control: { type: 'select' },
      options: ['sm', 'md', 'lg'],
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Small: Story = {
  args: {
    size: 'sm',
  },
};

export const Medium: Story = {
  args: {
    size: 'md',
  },
};

export const Large: Story = {
  args: {
    size: 'lg',
  },
};

export const AllSizes: Story = {
  render: () => (
    <div className="flex items-center gap-8">
      <div className="text-center">
        <LoadingSpinner size="sm" />
        <p className="mt-2 text-sm text-gray-600">Small</p>
      </div>
      <div className="text-center">
        <LoadingSpinner size="md" />
        <p className="mt-2 text-sm text-gray-600">Medium</p>
      </div>
      <div className="text-center">
        <LoadingSpinner size="lg" />
        <p className="mt-2 text-sm text-gray-600">Large</p>
      </div>
    </div>
  ),
};

export const WithCustomClass: Story = {
  args: {
    size: 'md',
    className: 'text-blue-600',
  },
};
