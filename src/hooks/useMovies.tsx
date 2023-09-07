import { useState, useEffect } from 'react';

type Callback = () => void;

export function useMovies(query: string, callback: Callback) {
  const [movies, setMovies] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string>('');

  useEffect(
    function () {
      callback?.();
      const controller = new AbortController();

      async function fetchMovies() {
        try {
          setIsLoading(true);
          setError('');
          const res = await fetch(
            `https://www.omdbapi.com/?apikey=${process.env.VITE_KEY}&s=${query}
      `,
            { signal: controller.signal }
          );

          if (!res.ok)
            throw new Error('Something went wrong with fetching movies');

          const data = await res.json();

          if (data.Response === 'False') throw new Error(data.Error);

          setMovies(data.Search);
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
        } catch (err: any) {
          console.log(err.message);

          if (err.name !== 'AbortError') {
            setError(err.message);
          }
        } finally {
          setIsLoading(false);
        }
      }
      if (query.length < 3) {
        setMovies([]);
        setError('');
        return;
      }

      // handleCloseMovie();
      fetchMovies();

      return function () {
        controller.abort();
      };
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [query]
  );

  return { movies, error, isLoading };
}
