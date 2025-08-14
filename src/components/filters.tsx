import { Search, Filter, X } from 'lucide-react';
import { Input } from '@/components/ui/input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Button } from '@/components/ui/button';
import { useRepoStore } from '@/store/repo-store';
import { cn } from '@/lib/utils';

interface FiltersProps {
  availableLanguages: string[];
  className?: string;
}

export function Filters({ availableLanguages, className }: FiltersProps) {
  const {
    nameFilter,
    languageFilter,
    setNameFilter,
    setLanguageFilter,
    resetFilters,
  } = useRepoStore();

  const hasActiveFilters =
    nameFilter || (languageFilter && languageFilter !== 'all');

  return (
    <div className={cn('space-y-4', className)}>
      <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400">
        <Filter className="w-4 h-4" />
        <span>Filter repositories</span>
      </div>

      <div className="flex flex-col sm:flex-row gap-3">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
          <Input
            placeholder="Search by name or description..."
            value={nameFilter}
            onChange={e => setNameFilter(e.target.value)}
            className="pl-10"
          />
        </div>

        <Select
          value={languageFilter || 'all'}
          onValueChange={setLanguageFilter}
        >
          <SelectTrigger className="w-full sm:w-48">
            <SelectValue placeholder="All languages" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All languages</SelectItem>
            {availableLanguages.map(language => (
              <SelectItem key={language} value={language}>
                {language}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>

        {hasActiveFilters && (
          <Button variant="outline" onClick={resetFilters} className="px-3">
            <X className="w-4 h-4" />
            <span className="ml-2 hidden sm:inline">Clear</span>
          </Button>
        )}
      </div>

      {hasActiveFilters && (
        <div className="flex items-center gap-2 text-sm text-gray-500">
          <span>Active filters:</span>
          {nameFilter && (
            <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200">
              Name: {nameFilter}
            </span>
          )}
          {languageFilter && languageFilter !== 'all' && (
            <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200">
              Language: {languageFilter}
            </span>
          )}
        </div>
      )}
    </div>
  );
}
