import { MovieProp } from './App';

interface WatchedMovieProps extends MovieProp {
  onDeleteWatched?: (movieID: string) => void;
}

export default function WatchedMovie({
  movie,
  onDeleteWatched,
}: WatchedMovieProps) {
  return (
    <li>
      <img src={movie.Poster} alt={`${movie.Title} poster`} />
      <h3>{movie.Title}</h3>
      <div>
        <p>
          <span>⭐️</span>
          <span>{movie.imdbRating}</span>
        </p>
        <p>
          <span>🌟</span>
          <span>{movie.userRating}</span>
        </p>
        <p>
          <span>⏳</span>
          <span>{movie.Runtime} min</span>
        </p>
        <button
          className="btn-delete"
          onClick={() => {
            console.log(movie.imdbID);
            onDeleteWatched?.(movie.imdbID);
          }}
        >
          X
        </button>
      </div>
    </li>
  );
}
