import type { Meta, StoryObj } from '@storybook/react';
import { RepoCard } from './repo-card';
import type { Repository } from '@/types/github';

const meta: Meta<typeof RepoCard> = {
  title: 'Components/RepoCard',
  component: RepoCard,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  decorators: [
    Story => (
      <div className="w-full max-w-md">
        <Story />
      </div>
    ),
  ],
};

export default meta;
type Story = StoryObj<typeof meta>;

const mockRepository: Repository = {
  id: '1',
  name: 'example-repo',
  description:
    'This is an example repository with a description that shows how the card handles longer text content.',
  url: 'https://github.com/username/example-repo',
  stargazerCount: 1234,
  forkCount: 56,
  isPrivate: false,
  updatedAt: new Date().toISOString(),
  primaryLanguage: {
    name: 'TypeScript',
    color: '#3178c6',
  },
};

const mockRepositoryNoLanguage: Repository = {
  ...mockRepository,
  id: '2',
  name: 'no-language-repo',
  primaryLanguage: null,
};

const mockRepositoryNoDescription: Repository = {
  ...mockRepository,
  id: '3',
  name: 'no-description-repo',
  description: null,
};

const mockRepositoryLongName: Repository = {
  ...mockRepository,
  id: '4',
  name: 'very-long-repository-name-that-might-cause-layout-issues',
  description:
    'Repository with an extremely long name to test layout handling.',
};

export const Default: Story = {
  args: {
    repository: mockRepository,
  },
};

export const NoLanguage: Story = {
  args: {
    repository: mockRepositoryNoLanguage,
  },
};

export const NoDescription: Story = {
  args: {
    repository: mockRepositoryNoDescription,
  },
};

export const LongName: Story = {
  args: {
    repository: mockRepositoryLongName,
  },
};

export const HighStars: Story = {
  args: {
    repository: {
      ...mockRepository,
      id: '5',
      name: 'popular-repo',
      stargazerCount: 50000,
      forkCount: 1200,
    },
  },
};

export const MultipleCards: Story = {
  render: () => (
    <div className="grid gap-4 md:grid-cols-2">
      <RepoCard repository={mockRepository} />
      <RepoCard repository={mockRepositoryNoLanguage} />
      <RepoCard repository={mockRepositoryNoDescription} />
      <RepoCard repository={mockRepositoryLongName} />
    </div>
  ),
  parameters: {
    layout: 'padded',
  },
};
