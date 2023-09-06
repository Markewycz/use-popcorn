import { MoviesProp } from '../App';

interface NumResultsProps extends MoviesProp {}

export default function NumResults({ movies }: NumResultsProps) {
  return (
    <p className="num-results">
      Found <strong>{movies.length}</strong> results
    </p>
  );
}
