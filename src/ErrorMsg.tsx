export default function ErrorMsg({ message }) {
  return (
    <p className="error">
      <span>⛔ </span>
      {message}
    </p>
  );
}
