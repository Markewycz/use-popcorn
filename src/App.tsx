import { useEffect, useState } from 'react';
import NavBar from './components/NavBar';
import MainContent from './components/MainContent';
import NumResults from './components/NumResults';
import Box from './components/Box';
import MovieList from './components/MovieList';
import WatchedSummary from './components/WatchedSummary';
import WatchedList from './components/WatchedList';
import Loader from './components/Loader';
import ErrorMsg from './components/ErrorMsg';
import Search from './components/Search';
import MovieDetails from './components/MovieDetails';

const KEY = import.meta.env.VITE_VERCEL_KEY;

export interface MovieObject {
  imdbID: string;
  imdbRating: number;
  userRating: number;
  Poster: string;
  Runtime: number;
  Title: string;
  Year: string;
}

export interface MovieProp {
  movie: MovieObject;
}

export interface MoviesProp {
  movies: MovieObject[];
}

export interface WatchedProp {
  watched: MovieObject[];
}

export interface ChildrenProp {
  children: React.ReactNode;
}

export default function App() {
  const [movies, setMovies] = useState([]);
  const [watched, setWatched] = useState<MovieObject[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string>('');
  const [query, setQuery] = useState('');
  const [selectedId, setSelectedId] = useState<string | null>(null);

  function handleSelectMovie(id: string) {
    setSelectedId(selectedId => (id === selectedId ? null : id));
  }

  function handleCloseMovie() {
    setSelectedId(null);
  }

  function handleAddWatched(movie: MovieObject) {
    setWatched(watched => [...watched, movie]);
  }

  function handleDeleteWatched(id: string) {
    setWatched(watched => watched.filter(movie => movie.imdbID !== id));
  }

  useEffect(
    function () {
      const controller = new AbortController();

      async function fetchMovies() {
        try {
          setIsLoading(true);
          setError('');
          const res = await fetch(
            `http://www.omdbapi.com/?apikey=${KEY}&s=${query}
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

      handleCloseMovie();
      fetchMovies();

      return function () {
        controller.abort();
      };
    },
    [query]
  );

  return (
    <>
      <NavBar>
        <Search query={query} setQuery={setQuery} />
        <NumResults movies={movies} />
      </NavBar>

      <MainContent>
        <Box>
          {isLoading && <Loader />}
          {!isLoading && !error && (
            <MovieList movies={movies} onSelectMovie={handleSelectMovie} />
          )}
          {error && <ErrorMsg message={error} />}
        </Box>

        <Box>
          {selectedId ? (
            <MovieDetails
              watched={watched}
              selectedId={selectedId}
              onCloseMovie={handleCloseMovie}
              onAddWatched={handleAddWatched}
            />
          ) : (
            <>
              <WatchedSummary watched={watched} />
              <WatchedList
                watched={watched}
                onDeleteWatched={handleDeleteWatched}
              />
            </>
          )}
        </Box>
      </MainContent>
    </>
  );
}
