import { useEffect, useState } from 'react';
import StarRating from './StarRating';
import Loader from './Loader';
import ErrorMsg from './ErrorMsg';
import { MovieObject, WatchedProp } from './App';

const KEY = '46ea9ca1';

interface MovieDetailsProps extends WatchedProp {
  selectedId: string;
  onCloseMovie: () => void;
  onAddWatched: (movieID: MovieObject) => void;
}

interface MovieDetails {
  Title: string;
  Year: string;
  Poster: string;
  Runtime: string;
  imdbRating: string;
  Plot: string;
  Released: string;
  Actors: string;
  Director: string;
  Genre: string;
}

export default function MovieDetails({
  selectedId,
  onCloseMovie,
  onAddWatched,
  watched,
}: MovieDetailsProps) {
  const [movie, setMovie] = useState<MovieDetails | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [userRating, setUserRating] = useState<number | null>(null);

  const isWatched = watched.map(movie => movie.imdbID).includes(selectedId);
  const watchedUserRating = watched.find(movie => movie.imdbID === selectedId)
    ?.userRating;

  const {
    Title,
    Year,
    Poster,
    Runtime,
    imdbRating,
    Plot,
    Released,
    Actors,
    Director,
    Genre,
  } = movie ?? {};

  function handleAdd() {
    if (Title && Year && imdbRating !== undefined) {
      const newWatchedMovie = {
        imdbID: selectedId,
        Title: Title,
        Year: Year,
        Poster: Poster || '',
        imdbRating: Number(imdbRating),
        Runtime: Number(Runtime?.split(' ')[0]),
        userRating: Number(userRating || 0),
      };

      onAddWatched(newWatchedMovie);
      onCloseMovie();
    }
  }
  useEffect(
    function () {
      function callback(e: KeyboardEvent) {
        console.log(e);
        if (e.code === 'Escape') {
          onCloseMovie();
        }
      }
      document.addEventListener('keydown', callback);

      return function () {
        document.removeEventListener('keydown', callback);
      };
    },
    [onCloseMovie],
  );

  useEffect(
    function () {
      async function getMovieDetails() {
        try {
          setIsLoading(true);
          setError('');
          const res = await fetch(
            `http://www.omdbapi.com/?apikey=${KEY}&i=${selectedId}`,
          );
          if (!res.ok)
            throw new Error('Something went wrong with fetching movie');

          const data = await res.json();
          if (data.Response === 'False')
            throw new Error("Couldn't get the data");

          setMovie(data);
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
        } catch (err: any) {
          console.log(err.message);
          setError(err.message);
        } finally {
          setIsLoading(false);
        }
      }
      getMovieDetails();
    },
    [selectedId],
  );

  useEffect(
    function () {
      if (!Title) return;
      document.title = `Movie | ${Title}`;

      return function () {
        document.title = 'usePopcorn';
      };
    },
    [Title],
  );

  return (
    <div className="details">
      {isLoading && <Loader />}
      {error && <ErrorMsg message={error} />}
      {!isLoading && !error && (
        <>
          <header>
            <button className="btn-back" onClick={onCloseMovie}>
              &larr;
            </button>
            <img src={Poster} alt={`Poster of the ${Title} movie`} />
            <div className="details-overview">
              <h2>{Title}</h2>
              <p>
                {Released} &bull; {Runtime}
              </p>
              <p>{Genre}</p>
              <p>
                <span>⭐</span> {imdbRating} IMDb rating
              </p>
            </div>
          </header>
          <section>
            <div className="rating">
              {!isWatched ? (
                <>
                  <StarRating
                    maxRating={10}
                    size={24}
                    onSetRating={setUserRating}
                  />

                  {typeof userRating === 'number' && userRating > 0 && (
                    <button className="btn-add" onClick={handleAdd}>
                      + Add to List
                    </button>
                  )}
                </>
              ) : (
                <p>You rated this movie - {watchedUserRating}⭐</p>
              )}
            </div>
            <p>
              <em>{Plot}</em>
            </p>
            <p>Starring {Actors}</p>
            <p>Directed by {Director}</p>
          </section>
        </>
      )}
    </div>
  );
}
