import { useRef } from 'react';
import { useKey } from '../hooks/useKey';

interface SearchProps {
  query: string;
  setQuery: (query: string) => void;
}

export default function Search({ query, setQuery }: SearchProps) {
  const inputEl = useRef<HTMLInputElement | null>(null);

  useKey('Enter', function () {
    if (document.activeElement === inputEl.current) return;
    inputEl.current?.focus();
    setQuery('');
  });

  return (
    <input
      className="search"
      type="text"
      placeholder="Search movies..."
      value={query}
      onChange={e => setQuery(e.target.value)}
      ref={inputEl}
    />
  );
}
