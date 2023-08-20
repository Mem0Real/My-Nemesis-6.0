export default function Skeleton({ className }) {
  return (
    <div
      className={`w-screen h-screen bg-neutral-300 dark:bg-neutral-900 motion-safe:animate-pulse rounded ${className}`}
    />
  );
}
