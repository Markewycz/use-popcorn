import NavBar from './NavBar';
import MainContent from './MainContent';
import NumResults from './NumResults';
import Box from './Box';
import { useEffect, useState } from 'react';
import MovieList from './MovieList';
import WatchedSummary from './WatchedSummary';
import WatchedList from './WatchedList';
import Loader from './Loader';
import ErrorMsg from './ErrorMsg';

const KEY = '46ea9ca1';

export default function App() {
  const [movies, setMovies] = useState([]);
  const [watched, setWatched] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const query = 'interstellar';

  useEffect(function () {
    async function fetchMovies() {
      try {
        setIsLoading(true);
        const res =
          await fetch(`http://www.omdbapi.com/?apikey=${KEY}&s=${query}
      `);

        if (!res.ok)
          throw new Error('Something went wrong with fetching movies');

        const data = await res.json();

        if (data.Response === 'False') throw new Error(data.Error);

        setMovies(data.Search);
        console.log(data);
      } catch (err) {
        console.error(err);
        setError(err.message);
      } finally {
        setIsLoading(false);
      }
    }
    fetchMovies();
  }, []);

  return (
    <>
      <NavBar>
        <NumResults movies={movies} />
      </NavBar>

      <MainContent>
        <Box>
          {isLoading && <Loader />}
          {!isLoading && !error && <MovieList movies={movies} />}
          {error && <ErrorMsg message={error} />}
        </Box>

        <Box>
          <WatchedSummary watched={watched} />
          <WatchedList watched={watched} />
        </Box>
      </MainContent>
    </>
  );
}
