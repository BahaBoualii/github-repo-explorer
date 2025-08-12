export interface Repository {
  id: string;
  name: string;
  description: string | null;
  url: string;
  stargazerCount: number;
  primaryLanguage: {
    name: string;
    color: string;
  } | null;
  updatedAt: string;
  forkCount: number;
  isPrivate: boolean;
}

export interface User {
  id: string;
  login: string;
  name: string | null;
  avatarUrl: string;
  repositories: {
    nodes: Repository[];
    totalCount: number;
    pageInfo: {
      hasNextPage: boolean;
      endCursor: string;
    };
  };
}

export interface GitHubSearchResponse {
  user: User | null;
}

export interface GitHubSearchVariables {
  username: string;
  first?: number;
  after?: string;
}
