import type { Meta, StoryObj } from '@storybook/react';
import { ErrorMessage } from './error-message';

const meta: Meta<typeof ErrorMessage> = {
  title: 'UI/ErrorMessage',
  component: ErrorMessage,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    onRetry: { action: 'retry' },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    message: 'Something went wrong while fetching data.',
  },
};

export const WithCustomTitle: Story = {
  args: {
    title: 'Network Error',
    message: 'Failed to connect to the server. Please check your internet connection.',
  },
};

export const WithRetryButton: Story = {
  args: {
    title: 'API Error',
    message: 'The GitHub API returned an error. This might be due to rate limiting or invalid credentials.',
    onRetry: () => console.log('Retry clicked'),
  },
};

export const LongMessage: Story = {
  args: {
    title: 'Validation Error',
    message: 'This is a very long error message that demonstrates how the component handles text that spans multiple lines and might be quite verbose. It should wrap properly and remain readable.',
  },
};

export const ShortMessage: Story = {
  args: {
    title: 'Error',
    message: 'Something failed.',
  },
};

export const AllVariants: Story = {
  render: () => (
    <div className="space-y-6">
      <ErrorMessage
        title="Network Error"
        message="Failed to connect to the server."
        onRetry={() => console.log('Retry 1')}
      />
      <ErrorMessage
        title="API Error"
        message="Invalid GitHub token provided."
      />
      <ErrorMessage
        message="Unknown error occurred."
      />
    </div>
  ),
  parameters: {
    layout: 'padded',
  },
};
