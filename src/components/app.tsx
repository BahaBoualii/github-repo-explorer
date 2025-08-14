import { useState, useEffect } from 'react';
import { AppLayout } from './app-layout';
import { SearchBar } from './search-bar';
import { RepoList } from './repo-list';
import { LoadingSpinner } from './ui/loading-spinner';
import { ErrorMessage } from './ui/error-message';
import { useRepoStore } from '@/store/repo-store';
import type { Repository } from '@/types/github';

// Client-side only Apollo Provider wrapper
function ApolloWrapper({ children }: { children: React.ReactNode }) {
  const [ApolloProvider, setApolloProvider] = useState<any>(null);
  const [apolloClient, setApolloClient] = useState<any>(null);

  useEffect(() => {
    // Dynamically import Apollo Client only on the client side
    const loadApollo = async () => {
      try {
        const pkg = await import('@apollo/client');
        const { ApolloProvider } = pkg;
        const { apolloClient } = await import('@/lib/apollo-client');
        setApolloProvider(() => ApolloProvider);
        setApolloClient(apolloClient);
      } catch (error) {
        console.error('Failed to load Apollo Client:', error);
      }
    };

    loadApollo();
  }, []);

  if (!ApolloProvider || !apolloClient) {
    return <>{children}</>;
  }

  return <ApolloProvider client={apolloClient}>{children}</ApolloProvider>;
}

// Component that uses Apollo Client hooks
function GitHubSearch() {
  const { username } = useRepoStore();
  const [searchUsername, setSearchUsername] = useState('');
  const [inputValue, setInputValue] = useState('');
  const [repositories, setRepositories] = useState<Repository[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [queryError, setQueryError] = useState<any>(null);
  const [data, setData] = useState<any>(null);

  // Handle search
  const handleSearch = async (username: string) => {
    setSearchUsername(username);
    setError(null);
    setRepositories([]);
    setLoading(true);
    setQueryError(null);
    setData(null);

    try {
      // Dynamically import and execute the GraphQL query
      const { gql } = await import('@apollo/client');
      const { apolloClient } = await import('@/lib/apollo-client');

      const GET_USER_REPOSITORIES = gql`
        query GetUserRepositories(
          $username: String!
          $first: Int = 100
          $after: String
        ) {
          user(login: $username) {
            id
            login
            name
            avatarUrl
            repositories(
              first: $first
              after: $after
              orderBy: { field: UPDATED_AT, direction: DESC }
              isFork: false
            ) {
              totalCount
              pageInfo {
                hasNextPage
                endCursor
              }
              nodes {
                id
                name
                description
                url
                stargazerCount
                forkCount
                isPrivate
                updatedAt
                primaryLanguage {
                  name
                  color
                }
              }
            }
          }
        }
      `;

      const result = await apolloClient.query({
        query: GET_USER_REPOSITORIES,
        variables: { username },
        errorPolicy: 'all',
      });

      setData(result.data);
      setQueryError(result.error);
    } catch (err) {
      setQueryError(err);
    } finally {
      setLoading(false);
    }
  };

  // Handle retry
  const handleRetry = () => {
    if (searchUsername) {
      handleSearch(searchUsername);
    }
  };

  // Handle reset
  const handleReset = () => {
    setSearchUsername('');
    setInputValue('');
    setRepositories([]);
    setError(null);
    setLoading(false);
    setQueryError(null);
    setData(null);
  };

  // Process query results
  useEffect(() => {
    if (data?.user) {
      setRepositories(data.user.repositories.nodes || []);
      setError(null);
    } else if (data?.user === null && searchUsername) {
      setError(`User "${searchUsername}" not found on GitHub`);
      setRepositories([]);
    }
  }, [data, searchUsername]);

  // Handle query errors
  useEffect(() => {
    if (queryError) {
      if (queryError.message?.includes('rate limit')) {
        setError(
          'GitHub API rate limit exceeded. Please try again later or check your token.'
        );
      } else if (queryError.message?.includes('Bad credentials')) {
        setError(
          'Invalid GitHub token. Please check your VITE_GITHUB_TOKEN in .env file.'
        );
      } else {
        setError(`GitHub API error: ${queryError.message || 'Unknown error'}`);
      }
      setRepositories([]);
    }
  }, [queryError]);

  return (
    <AppLayout>
      <div className="space-y-8">
        {/* Hero Section */}
        <div className="text-center space-y-4">
          <h2 className="text-3xl font-bold text-gray-900 dark:text-gray-100">
            Explore GitHub Repositories
          </h2>
          <p className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
            Enter a GitHub username to discover their public repositories.
            Filter by name, language, and explore their coding projects.
          </p>
          <div className="text-sm text-gray-500 dark:text-gray-400">
            <p>
              💡 <strong>Note:</strong> The API has rate limits, so be patient
              with requests
            </p>
          </div>
        </div>

        {/* Search Section */}
        <SearchBar
          onSearch={handleSearch}
          isLoading={loading}
          inputValue={inputValue}
          setInputValue={setInputValue}
        />

        {/* Results Section */}
        {searchUsername && (
          <div className="space-y-6">
            {loading && (
              <div className="text-center py-12">
                <LoadingSpinner size="lg" />
                <p className="mt-4 text-gray-600 dark:text-gray-400">
                  Searching for repositories...
                </p>
              </div>
            )}

            {error && (
              <div className="space-y-4">
                <ErrorMessage
                  title="Failed to fetch repositories"
                  message={error}
                  onRetry={handleRetry}
                />
                <div className="text-center">
                  <button
                    onClick={handleReset}
                    className="inline-flex items-center gap-2 px-4 py-2 text-sm font-medium text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-100 border border-gray-300 dark:border-gray-600 rounded-md hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors"
                  >
                    <svg
                      className="w-4 h-4"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 8.003 0 01-15.357-2m15.357 2H15"
                      />
                    </svg>
                    Start New Search
                  </button>
                </div>
              </div>
            )}

            {!loading &&
              !error &&
              repositories.length === 0 &&
              searchUsername && (
                <div className="text-center py-12">
                  <div className="text-gray-500 dark:text-gray-400">
                    <p className="text-lg mb-2">No repositories found</p>
                    <p className="text-sm mb-4">
                      This user might not have any public repositories or the
                      username might be incorrect.
                    </p>
                    <button
                      onClick={handleReset}
                      className="inline-flex items-center gap-2 px-4 py-2 text-sm font-medium text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-100 border border-gray-300 dark:border-gray-600 rounded-md hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors"
                    >
                      <svg
                        className="w-4 h-4"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 8.003 0 01-15.357-2m15.357 2H15"
                        />
                      </svg>
                      Try Different Username
                    </button>
                  </div>
                </div>
              )}

            {!loading && !error && repositories.length > 0 && (
              <div className="space-y-4">
                <div className="text-center">
                  <div className="flex items-center justify-center gap-4 mb-4">
                    <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-100">
                      {username || searchUsername}'s Repositories
                    </h3>
                    <button
                      onClick={handleReset}
                      className="inline-flex items-center gap-2 px-3 py-1.5 text-sm font-medium text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-100 border border-gray-300 dark:border-gray-600 rounded-md hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors"
                    >
                      <svg
                        className="w-4 h-4"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 8.003 0 01-15.357-2m15.357 2H15"
                        />
                      </svg>
                      New Search
                    </button>
                  </div>
                  <p className="text-gray-600 dark:text-gray-400">
                    Found {repositories.length} public repository
                    {repositories.length !== 1 ? 's' : ''}
                  </p>
                </div>

                <RepoList repositories={repositories} />
              </div>
            )}
          </div>
        )}

        {/* Empty State */}
        {!searchUsername && (
          <div className="text-center py-16">
            <div className="text-gray-500 dark:text-gray-400">
              <p className="text-lg mb-2">Ready to explore?</p>
              <p className="text-sm">
                Enter a GitHub username above to get started
              </p>
            </div>
          </div>
        )}
      </div>
    </AppLayout>
  );
}

export function App() {
  return (
    <ApolloWrapper>
      <GitHubSearch />
    </ApolloWrapper>
  );
}
