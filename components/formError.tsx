interface formErrorTypes {
  message: string | undefined;
  className?: string;
}

export default function FormError({ message, className = "" }: formErrorTypes) {
  if (!message) return null;

  return <p className={`text-sm text-red-600 ${className}`}>{message}</p>;
}
