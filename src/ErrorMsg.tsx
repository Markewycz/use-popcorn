interface ErrorMsgProps {
  message: string;
}

export default function ErrorMsg({ message }: ErrorMsgProps) {
  return (
    <p className="error">
      <span>⛔ </span>
      {message}
    </p>
  );
}
