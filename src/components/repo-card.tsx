import { Star, GitFork, Calendar, ExternalLink } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import type { Repository } from '@/types/github';
import { formatDate, formatNumber } from '@/lib/utils';
import { cn } from '@/lib/utils';

interface RepoCardProps {
  repository: Repository;
  className?: string;
}

export function RepoCard({ repository, className }: RepoCardProps) {
  const {
    name,
    description,
    url,
    stargazerCount,
    forkCount,
    primaryLanguage,
    updatedAt,
  } = repository;

  return (
    <Card
      className={cn(
        'group hover:shadow-lg transition-all duration-200 hover:-translate-y-1',
        className
      )}
    >
      <CardHeader className="pb-3">
        <div className="flex items-start justify-between">
          <CardTitle className="text-lg font-semibold group-hover:text-blue-600 transition-colors">
            <a
              href={url}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 hover:underline"
            >
              {name}
              <ExternalLink className="w-4 h-4 opacity-0 group-hover:opacity-100 transition-opacity" />
            </a>
          </CardTitle>
          {primaryLanguage && (
            <Badge variant="secondary" className="flex items-center gap-1">
              <div
                className="w-3 h-3 rounded-full"
                style={{ backgroundColor: primaryLanguage.color }}
              />
              {primaryLanguage.name}
            </Badge>
          )}
        </div>
        {description && (
          <p className="text-gray-600 dark:text-gray-400 text-sm line-clamp-2">
            {description}
          </p>
        )}
      </CardHeader>

      <CardContent className="pt-0">
        <div className="flex items-center justify-between text-sm text-gray-500">
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-1">
              <Star className="w-4 h-4" />
              <span>{formatNumber(stargazerCount)}</span>
            </div>
            <div className="flex items-center gap-1">
              <GitFork className="w-4 h-4" />
              <span>{formatNumber(forkCount)}</span>
            </div>
          </div>

          <div className="flex items-center gap-1">
            <Calendar className="w-4 h-4" />
            <span>Updated {formatDate(updatedAt)}</span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
