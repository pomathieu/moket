type MessageProps = { message: string };

export function ErrorMessage({ message }: MessageProps) {
  return (
    <div
      className="p-2 mb-2 rounded bg-red-50 text-red-700 border border-red-200 animate-fade-in"
      aria-live="polite"
      role="alert">
      {message}
    </div>
  );
}

export function SuccessMessage({ message }: MessageProps) {
  return (
    <div
      className="p-2 mb-2 rounded bg-green-50 text-green-700 border border-green-200 animate-fade-in"
      aria-live="polite"
      role="status">
      {message}
    </div>
  );
}
