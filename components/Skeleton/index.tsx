interface ISkeleton {
  className?: string;
}

export default function Skeleton({ className }: ISkeleton) {
  return (
    <div className={`animate-pulse rounded-lg bg-gray-200 ${className}`} />
  );
}
