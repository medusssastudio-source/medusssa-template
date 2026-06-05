import { cn } from '../lib/cn';

interface SkeletonProps extends React.HTMLAttributes<HTMLDivElement> {
  rounded?: 'sm' | 'md' | 'lg' | 'xl' | '2xl' | 'full';
}

function Skeleton({ rounded = 'md', className, ...props }: SkeletonProps) {
  const roundedMap = {
    sm: 'rounded-sm',
    md: 'rounded-md',
    lg: 'rounded-lg',
    xl: 'rounded-xl',
    '2xl': 'rounded-2xl',
    full: 'rounded-full',
  };

  return (
    <div
      role="status"
      aria-label="Cargando..."
      className={cn(
        'animate-pulse bg-gradient-to-r from-brand-border via-[#FDF0EF] to-brand-border bg-[length:200%_100%]',
        roundedMap[rounded],
        className,
      )}
      style={{
        animation: 'skeleton-shimmer 1.8s ease-in-out infinite',
      }}
      {...props}
    />
  );
}

export { Skeleton };
export type { SkeletonProps };
