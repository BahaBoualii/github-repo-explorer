import { create } from 'zustand';
import { devtools } from 'zustand/middleware';

interface RepoStore {
  username: string;
  nameFilter: string;
  languageFilter: string;
  availableLanguages: string[];
  setUsername: (username: string) => void;
  setNameFilter: (filter: string) => void;
  setLanguageFilter: (language: string) => void;
  setAvailableLanguages: (languages: string[]) => void;
  resetFilters: () => void;
}

export const useRepoStore = create<RepoStore>()(
  devtools(
    (set) => ({
      username: '',
      nameFilter: '',
      languageFilter: 'all',
      availableLanguages: [],
      
      setUsername: (username) => set({ username }),
      setNameFilter: (filter) => set({ nameFilter: filter }),
      setLanguageFilter: (language) => set({ languageFilter: language }),
      setAvailableLanguages: (languages) => set({ availableLanguages: languages }),
      resetFilters: () => set({ nameFilter: '', languageFilter: 'all' }),
    }),
    {
      name: 'repo-store',
    }
  )
);
