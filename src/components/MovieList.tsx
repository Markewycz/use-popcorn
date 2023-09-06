import { MovieObject } from '../App';
import MovieItem from './MovieItem';

interface MovieListProps {
  movies: MovieObject[];
  onSelectMovie: (movieID: string) => void;
}

export default function MovieList({ movies, onSelectMovie }: MovieListProps) {
  return (
    <ul className="list list-movies">
      {movies?.map(movie => (
        <MovieItem
          key={movie.imdbID}
          movie={movie}
          onSelectMovie={onSelectMovie}
        />
      ))}
    </ul>
  );
}
