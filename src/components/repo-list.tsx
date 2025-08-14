import type { Repository } from '@/types/github';
import { RepoCard } from './repo-card';
import { Filters } from './filters';
import { extractLanguages, filterRepositories } from '@/lib/utils';
import { useRepoStore } from '@/store/repo-store';
import { useEffect } from 'react';
import { cn } from '@/lib/utils';

interface RepoListProps {
  repositories: Repository[];
  className?: string;
}

export function RepoList({ repositories, className }: RepoListProps) {
  const { nameFilter, languageFilter, setAvailableLanguages } = useRepoStore();

  // Extract available languages from repositories
  useEffect(() => {
    const languages = extractLanguages(repositories);
    setAvailableLanguages(languages);
  }, [repositories, setAvailableLanguages]);

  // Filter repositories based on current filters
  const filteredRepositories = filterRepositories(
    repositories,
    nameFilter,
    languageFilter
  );

  if (repositories.length === 0) {
    return null; // Don't show anything if no repositories
  }

  return (
    <div className={cn('space-y-6', className)}>
      <Filters availableLanguages={extractLanguages(repositories)} />

      {filteredRepositories.length === 0 ? (
        <div className="text-center py-12">
          <div className="text-gray-500 dark:text-gray-400">
            <p className="text-lg mb-2">No repositories found</p>
            <p className="text-sm">
              Try adjusting your filters or search terms
            </p>
          </div>
        </div>
      ) : (
        <>
          <div className="flex items-center justify-between text-sm text-gray-600 dark:text-gray-400">
            <span>
              Showing {filteredRepositories.length} of {repositories.length}{' '}
              repositories
            </span>
            {nameFilter || languageFilter ? (
              <span className="text-blue-600 dark:text-blue-400">
                Filtered results
              </span>
            ) : null}
          </div>

          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {filteredRepositories.map(repository => (
              <RepoCard key={repository.id} repository={repository} />
            ))}
          </div>
        </>
      )}
    </div>
  );
}
