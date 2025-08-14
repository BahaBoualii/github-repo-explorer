import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';
import type { Repository } from '@/types/github';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function filterRepositories(
  repositories: Repository[],
  nameFilter: string,
  languageFilter: string
): Repository[] {
  return repositories.filter(repo => {
    const matchesName =
      !nameFilter ||
      repo.name.toLowerCase().includes(nameFilter.toLowerCase()) ||
      (repo.description &&
        repo.description.toLowerCase().includes(nameFilter.toLowerCase()));

    const matchesLanguage =
      !languageFilter ||
      languageFilter === 'all' ||
      repo.primaryLanguage?.name === languageFilter;

    return matchesName && matchesLanguage;
  });
}

export function extractLanguages(repositories: Repository[]): string[] {
  const languages = new Set<string>();

  repositories.forEach(repo => {
    if (repo.primaryLanguage?.name) {
      languages.add(repo.primaryLanguage.name);
    }
  });

  return Array.from(languages).sort();
}

export function formatDate(dateString: string): string {
  const date = new Date(dateString);
  const now = new Date();
  const diffInDays = Math.floor(
    (now.getTime() - date.getTime()) / (1000 * 60 * 60 * 24)
  );

  if (diffInDays === 0) return 'Today';
  if (diffInDays === 1) return 'Yesterday';
  if (diffInDays < 7) return `${diffInDays} days ago`;
  if (diffInDays < 30) return `${Math.floor(diffInDays / 7)} weeks ago`;
  if (diffInDays < 365) return `${Math.floor(diffInDays / 30)} months ago`;

  return date.toLocaleDateString();
}

export function formatNumber(num: number): string {
  if (num >= 1000000) {
    return (num / 1000000).toFixed(1) + 'M';
  }
  if (num >= 1000) {
    return (num / 1000).toFixed(1) + 'K';
  }
  return num.toString();
}
