import { MovieProp } from '../App';

interface MovieItemProps extends MovieProp {
  onSelectMovie?: (movieID: string) => void;
}

export default function MovieItem({ movie, onSelectMovie }: MovieItemProps) {
  return (
    <li onClick={() => onSelectMovie?.(movie.imdbID)}>
      <img src={movie.Poster} alt={`${movie.Title} poster`} />
      <h3>{movie.Title}</h3>
      <div>
        <p>
          <span>📆</span>
          <span>{movie.Year}</span>
        </p>
      </div>
    </li>
  );
}
