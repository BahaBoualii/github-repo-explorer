import { Github, Moon, Sun } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useRepoStore } from '@/store/repo-store';
import { cn } from '@/lib/utils';
import { useState, useEffect } from 'react';

interface AppLayoutProps {
  children: React.ReactNode;
  className?: string;
}

export function AppLayout({ children, className }: AppLayoutProps) {
  const [isDark, setIsDark] = useState(false);
  const { username } = useRepoStore();

  useEffect(() => {
    // Check system preference
    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
    setIsDark(mediaQuery.matches);

    const handleChange = (e: MediaQueryListEvent) => setIsDark(e.matches);
    mediaQuery.addEventListener('change', handleChange);

    return () => mediaQuery.removeEventListener('change', handleChange);
  }, []);

  useEffect(() => {
    // Apply theme to document
    document.documentElement.classList.toggle('dark', isDark);
  }, [isDark]);

  const toggleTheme = () => setIsDark(!isDark);

  return (
    <div
      className={cn(
        'min-h-screen flex flex-col bg-gray-50 dark:bg-gray-950 transition-colors',
        className
      )}
    >
      {/* Header */}
      <header className="bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-800 sticky top-0 z-50 flex-shrink-0">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center gap-3">
              <Github className="w-8 h-8 text-gray-900 dark:text-gray-100" />
              <h1 className="text-xl font-bold text-gray-900 dark:text-gray-100">
                GitHub Repo Explorer
              </h1>
            </div>

            <div className="flex items-center gap-4">
              {username && (
                <div className="hidden sm:block text-sm text-gray-600 dark:text-gray-400">
                  Viewing:{' '}
                  <span className="font-medium text-gray-900 dark:text-gray-100">
                    @{username}
                  </span>
                </div>
              )}

              <Button
                variant="ghost"
                size="sm"
                onClick={toggleTheme}
                className="p-2"
              >
                {isDark ? (
                  <Sun className="w-5 h-5" />
                ) : (
                  <Moon className="w-5 h-5" />
                )}
              </Button>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {children}
      </main>

      {/* Footer */}
      <footer className="bg-white dark:bg-gray-900 border-t border-gray-200 dark:border-gray-800 mt-auto flex-shrink-0">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="text-center text-sm text-gray-600 dark:text-gray-400">
            <p>
              Built with React, TypeScript, and ShadCN UI • Powered by GitHub
              GraphQL API
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
