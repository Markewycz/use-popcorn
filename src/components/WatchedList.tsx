import { WatchedProp } from '../App';
import WatchedMovie from './WatchedMovie';

interface WatchedListProps extends WatchedProp {
  onDeleteWatched?: (id: string) => void;
}

export default function WatchedList({
  watched,
  onDeleteWatched,
}: WatchedListProps) {
  return (
    <ul className="list">
      {watched.map(movie => (
        <WatchedMovie
          key={movie.imdbID}
          movie={movie}
          onDeleteWatched={onDeleteWatched}
        />
      ))}
    </ul>
  );
}
