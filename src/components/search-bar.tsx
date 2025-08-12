import { Search, Github } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useRepoStore } from "@/store/repo-store";
import { cn } from "@/lib/utils";

interface SearchBarProps {
  onSearch: (username: string) => void;
  isLoading?: boolean;
  className?: string;
  inputValue: string;
  setInputValue: (value: string) => void;
}

export function SearchBar({ onSearch, isLoading, className, inputValue, setInputValue }: SearchBarProps) {
  const { username, setUsername } = useRepoStore();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const trimmedUsername = inputValue.trim();
    
    if (trimmedUsername) {
      setUsername(trimmedUsername);
      onSearch(trimmedUsername);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      handleSubmit(e as any);
    }
  };

  return (
    <div className={cn("w-full max-w-2xl mx-auto", className)}>
      <form onSubmit={handleSubmit} className="flex gap-2">
        <div className="relative flex-1">
          <Github className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
          <Input
            type="text"
            placeholder="Enter GitHub username..."
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            onKeyPress={handleKeyPress}
            className="pl-10 pr-4 py-3 text-lg"
            disabled={isLoading}
          />
        </div>
        <Button 
          type="submit" 
          disabled={!inputValue.trim() || isLoading}
          className="px-6 py-3"
        >
          {isLoading ? (
            <Search className="w-5 h-5 animate-pulse" />
          ) : (
            <Search className="w-5 h-5" />
          )}
          <span className="ml-2 hidden sm:inline">Search</span>
        </Button>
      </form>
    </div>
  );
}
