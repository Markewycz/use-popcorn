import { useState } from 'react';
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
import { useMovies } from './hooks/useMovies';
import { useLocalStorage } from './hooks/useLocalStorage';

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
  const [query, setQuery] = useState('');
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const { movies, error, isLoading } = useMovies(query, handleCloseMovie);
  const [watched, setWatched] = useLocalStorage([], 'watched');

  function handleSelectMovie(id: string) {
    setSelectedId(selectedId => (id === selectedId ? null : id));
  }

  function handleCloseMovie() {
    setSelectedId(null);
  }

  function handleAddWatched(movie: MovieObject) {
    setWatched((watched: MovieObject[]) => [...watched, movie]);
  }

  function handleDeleteWatched(id: string) {
    setWatched((watched: MovieObject[]) =>
      watched.filter(movie => movie.imdbID !== id)
    );
  }

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
