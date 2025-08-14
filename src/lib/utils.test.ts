import { describe, it, expect } from 'vitest';
import {
  cn,
  filterRepositories,
  extractLanguages,
  formatDate,
  formatNumber,
} from './utils';
import type { Repository } from '@/types/github';

describe('utils', () => {
  describe('cn', () => {
    it('combines class names correctly', () => {
      expect(cn('class1', 'class2')).toBe('class1 class2');
    });

    it('handles conditional classes', () => {
      expect(cn('base', true && 'conditional', false && 'hidden')).toBe(
        'base conditional'
      );
    });

    it('handles undefined and null values', () => {
      expect(cn('base', undefined, null, 'valid')).toBe('base valid');
    });
  });

  describe('filterRepositories', () => {
    const mockRepositories: Repository[] = [
      {
        id: '1',
        name: 'react-app',
        description: 'A React application',
        url: 'https://github.com/user/react-app',
        stargazerCount: 100,
        forkCount: 10,
        isPrivate: false,
        updatedAt: '2024-01-01T00:00:00Z',
        primaryLanguage: { name: 'TypeScript', color: '#3178c6' },
      },
      {
        id: '2',
        name: 'python-script',
        description: 'A Python utility script',
        url: 'https://github.com/user/python-script',
        stargazerCount: 50,
        forkCount: 5,
        isPrivate: false,
        updatedAt: '2024-01-01T00:00:00Z',
        primaryLanguage: { name: 'Python', color: '#3776ab' },
      },
      {
        id: '3',
        name: 'node-api',
        description: 'Node.js API server',
        url: 'https://github.com/user/node-api',
        stargazerCount: 200,
        forkCount: 20,
        isPrivate: false,
        updatedAt: '2024-01-01T00:00:00Z',
        primaryLanguage: { name: 'JavaScript', color: '#f1e05a' },
      },
    ];

    it('returns all repositories when no filters applied', () => {
      const result = filterRepositories(mockRepositories, '', '');
      expect(result).toHaveLength(3);
    });

    it('filters by name correctly', () => {
      const result = filterRepositories(mockRepositories, 'react', '');
      expect(result).toHaveLength(1);
      expect(result[0].name).toBe('react-app');
    });

    it('filters by description correctly', () => {
      const result = filterRepositories(mockRepositories, 'utility', '');
      expect(result).toHaveLength(1);
      expect(result[0].name).toBe('python-script');
    });

    it('filters by language correctly', () => {
      const result = filterRepositories(mockRepositories, '', 'TypeScript');
      expect(result).toHaveLength(1);
      expect(result[0].primaryLanguage?.name).toBe('TypeScript');
    });

    it('combines name and language filters', () => {
      const result = filterRepositories(mockRepositories, 'script', 'Python');
      expect(result).toHaveLength(1);
      expect(result[0].name).toBe('python-script');
    });

    it('returns empty array when no matches found', () => {
      const result = filterRepositories(mockRepositories, 'nonexistent', '');
      expect(result).toHaveLength(0);
    });

    it('handles case-insensitive name filtering', () => {
      const result = filterRepositories(mockRepositories, 'REACT', '');
      expect(result).toHaveLength(1);
      expect(result[0].name).toBe('react-app');
    });
  });

  describe('extractLanguages', () => {
    const mockRepositories: Repository[] = [
      {
        id: '1',
        name: 'repo1',
        description: null,
        url: 'https://github.com/user/repo1',
        stargazerCount: 0,
        forkCount: 0,
        isPrivate: false,
        updatedAt: '2024-01-01T00:00:00Z',
        primaryLanguage: { name: 'TypeScript', color: '#3178c6' },
      },
      {
        id: '2',
        name: 'repo2',
        description: null,
        url: 'https://github.com/user/repo2',
        stargazerCount: 0,
        forkCount: 0,
        isPrivate: false,
        updatedAt: '2024-01-01T00:00:00Z',
        primaryLanguage: { name: 'Python', color: '#3776ab' },
      },
      {
        id: '3',
        name: 'repo3',
        description: null,
        url: 'https://github.com/user/repo3',
        stargazerCount: 0,
        forkCount: 0,
        isPrivate: false,
        updatedAt: '2024-01-01T00:00:00Z',
        primaryLanguage: null,
      },
      {
        id: '4',
        name: 'repo4',
        description: null,
        url: 'https://github.com/user/repo4',
        stargazerCount: 0,
        forkCount: 0,
        isPrivate: false,
        updatedAt: '2024-01-01T00:00:00Z',
        primaryLanguage: { name: 'TypeScript', color: '#3178c6' },
      },
    ];

    it('extracts unique languages correctly', () => {
      const result = extractLanguages(mockRepositories);
      expect(result).toEqual(['Python', 'TypeScript']);
    });

    it('handles repositories without languages', () => {
      const result = extractLanguages(mockRepositories);
      expect(result).not.toContain(null);
      expect(result).not.toContain(undefined);
    });

    it('returns sorted languages', () => {
      const result = extractLanguages(mockRepositories);
      expect(result[0]).toBe('Python');
      expect(result[1]).toBe('TypeScript');
    });

    it('returns empty array for empty repositories', () => {
      const result = extractLanguages([]);
      expect(result).toEqual([]);
    });
  });

  describe('formatDate', () => {
    it('formats today correctly', () => {
      const today = new Date().toISOString();
      expect(formatDate(today)).toBe('Today');
    });

    it('formats yesterday correctly', () => {
      const yesterday = new Date(
        Date.now() - 24 * 60 * 60 * 1000
      ).toISOString();
      expect(formatDate(yesterday)).toBe('Yesterday');
    });

    it('formats days ago correctly', () => {
      const threeDaysAgo = new Date(
        Date.now() - 3 * 24 * 60 * 60 * 1000
      ).toISOString();
      expect(formatDate(threeDaysAgo)).toBe('3 days ago');
    });

    it('formats weeks ago correctly', () => {
      const twoWeeksAgo = new Date(
        Date.now() - 14 * 24 * 60 * 60 * 1000
      ).toISOString();
      expect(formatDate(twoWeeksAgo)).toBe('2 weeks ago');
    });

    it('formats months ago correctly', () => {
      const twoMonthsAgo = new Date(
        Date.now() - 60 * 24 * 60 * 60 * 1000
      ).toISOString();
      expect(formatDate(twoMonthsAgo)).toBe('2 months ago');
    });

    it('formats years ago correctly', () => {
      const twoYearsAgo = new Date(
        Date.now() - 2 * 365 * 24 * 60 * 60 * 1000
      ).toISOString();
      const result = formatDate(twoYearsAgo);
      // The function should return a date string for dates older than 1 year
      expect(result).toMatch(/\d+\/\d+\/\d+/);
    });
  });

  describe('formatNumber', () => {
    it('formats numbers under 1000 correctly', () => {
      expect(formatNumber(0)).toBe('0');
      expect(formatNumber(999)).toBe('999');
    });

    it('formats thousands correctly', () => {
      expect(formatNumber(1000)).toBe('1.0K');
      expect(formatNumber(1500)).toBe('1.5K');
      expect(formatNumber(9999)).toBe('10.0K');
    });

    it('formats millions correctly', () => {
      expect(formatNumber(1000000)).toBe('1.0M');
      expect(formatNumber(1500000)).toBe('1.5M');
      expect(formatNumber(9999999)).toBe('10.0M');
    });

    it('handles edge cases', () => {
      expect(formatNumber(999999)).toBe('1000.0K');
      expect(formatNumber(100000)).toBe('100.0K');
    });
  });
});
