import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { SearchBar } from './search-bar';
import { useRepoStore } from '@/store/repo-store';

// Mock the store
vi.mock('@/store/repo-store', () => ({
  useRepoStore: vi.fn(),
}));

// Mock lucide-react icons
vi.mock('lucide-react', () => ({
  Search: ({ className }: { className?: string }) => <div data-testid="search-icon" className={className}>Search</div>,
  Github: ({ className }: { className?: string }) => <div data-testid="github-icon" className={className}>Github</div>,
}));

describe('SearchBar', () => {
  const mockOnSearch = vi.fn();
  const mockSetUsername = vi.fn();

  beforeEach(() => {
    vi.clearAllMocks();
    (useRepoStore as any).mockReturnValue({
      username: '',
      setUsername: mockSetUsername,
    });
  });

  it('renders search input and button', () => {
    render(<SearchBar onSearch={mockOnSearch} inputValue={''} setInputValue={function (value: string): void {
        throw new Error('Function not implemented.');
    } } />);
    
    expect(screen.getByPlaceholderText('Enter GitHub username...')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /search/i })).toBeInTheDocument();
    expect(screen.getByTestId('github-icon')).toBeInTheDocument();
  });

  it('calls onSearch when form is submitted with valid username', async () => {
    render(<SearchBar onSearch={mockOnSearch} inputValue={''} setInputValue={function (value: string): void {
        throw new Error('Function not implemented.');
    } } />);
    
    const input = screen.getByPlaceholderText('Enter GitHub username...');
    const button = screen.getByRole('button', { name: /search/i });
    
    fireEvent.change(input, { target: { value: 'testuser' } });
    fireEvent.click(button);
    
    await waitFor(() => {
      expect(mockOnSearch).toHaveBeenCalledWith('testuser');
      expect(mockSetUsername).toHaveBeenCalledWith('testuser');
    });
  });

  it('calls onSearch when Enter key is pressed', async () => {
    render(<SearchBar onSearch={mockOnSearch} inputValue={''} setInputValue={function (value: string): void {
        throw new Error('Function not implemented.');
    } } />);
    
    const input = screen.getByPlaceholderText('Enter GitHub username...');
    
    fireEvent.change(input, { target: { value: 'testuser' } });
    fireEvent.keyPress(input, { key: 'Enter', code: 'Enter' });
    
    await waitFor(() => {
      expect(mockOnSearch).toHaveBeenCalledWith('testuser');
    });
  });

  it('does not call onSearch with empty username', () => {
    render(<SearchBar onSearch={mockOnSearch} inputValue={''} setInputValue={function (value: string): void {
        throw new Error('Function not implemented.');
    } } />);
    
    const button = screen.getByRole('button', { name: /search/i });
    
    fireEvent.click(button);
    
    expect(mockOnSearch).not.toHaveBeenCalled();
  });

  it('trims whitespace from username', async () => {
    render(<SearchBar onSearch={mockOnSearch} inputValue={''} setInputValue={function (value: string): void {
        throw new Error('Function not implemented.');
    } } />);
    
    const input = screen.getByPlaceholderText('Enter GitHub username...');
    const button = screen.getByRole('button', { name: /search/i });
    
    fireEvent.change(input, { target: { value: '  testuser  ' } });
    fireEvent.click(button);
    
    await waitFor(() => {
      expect(mockOnSearch).toHaveBeenCalledWith('testuser');
    });
  });

  it('disables input and button when loading', () => {
    render(<SearchBar onSearch={mockOnSearch} isLoading={true} inputValue={''} setInputValue={function (value: string): void {
        throw new Error('Function not implemented.');
    } } />);
    
    const input = screen.getByPlaceholderText('Enter GitHub username...');
    const button = screen.getByRole('button', { name: /search/i });
    
    expect(input).toBeDisabled();
    expect(button).toBeDisabled();
  });

  it('shows loading state in button when isLoading is true', () => {
    render(<SearchBar onSearch={mockOnSearch} isLoading={true} inputValue={''} setInputValue={function (value: string): void {
        throw new Error('Function not implemented.');
    } } />);
    
    const button = screen.getByRole('button', { name: /search/i });
    expect(button).toBeInTheDocument();
  });

  it('disables button when input is empty', () => {
    render(<SearchBar onSearch={mockOnSearch} inputValue={''} setInputValue={function (value: string): void {
        throw new Error('Function not implemented.');
    } } />);
    
    const button = screen.getByRole('button', { name: /search/i });
    expect(button).toBeDisabled();
  });

  it('enables button when input has value', () => {
    render(<SearchBar onSearch={mockOnSearch} inputValue={''} setInputValue={function (value: string): void {
        throw new Error('Function not implemented.');
    } } />);
    
    const input = screen.getByPlaceholderText('Enter GitHub username...');
    const button = screen.getByRole('button', { name: /search/i });
    
    fireEvent.change(input, { target: { value: 'testuser' } });
    
    expect(button).not.toBeDisabled();
  });
});
