import { Star } from 'lucide-react';
import { cn } from '../lib/cn';

interface StarRatingProps {
  value: number;
  max?: number;
  size?: 'sm' | 'md' | 'lg';
  className?: string;
}

const sizeMap = { sm: 12, md: 16, lg: 20 };

function StarRating({ value, max = 5, size = 'md', className }: StarRatingProps) {
  const starSize = sizeMap[size];

  return (
    <div
      className={cn('flex items-center gap-0.5', className)}
      role="img"
      aria-label={`${value} de ${max} estrellas`}
    >
      {Array.from({ length: max }).map((_, i) => {
        const filled = i < Math.floor(value);
        const partial = !filled && i < value;

        return (
          <span key={i} className="relative inline-flex">
            <Star
              size={starSize}
              className="text-brand-border"
              fill="currentColor"
              strokeWidth={0}
            />
            {(filled || partial) && (
              <span
                className="absolute inset-0 overflow-hidden"
                style={{ width: filled ? '100%' : `${(value % 1) * 100}%` }}
              >
                <Star
                  size={starSize}
                  className="text-status-warning"
                  fill="currentColor"
                  strokeWidth={0}
                />
              </span>
            )}
          </span>
        );
      })}
    </div>
  );
}

export { StarRating };
export type { StarRatingProps };
