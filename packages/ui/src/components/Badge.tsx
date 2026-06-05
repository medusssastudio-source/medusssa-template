import { cn } from '../lib/cn';

const variants = {
  default: 'bg-brand-cream text-brand-charcoal border border-brand-border',
  coral: 'bg-primary-soft text-primary border border-primary-light',
  success: 'bg-green-50 text-status-success border border-green-200',
  warning: 'bg-amber-50 text-status-warning border border-amber-200',
};

interface BadgeProps extends React.HTMLAttributes<HTMLSpanElement> {
  variant?: keyof typeof variants;
}

function Badge({ variant = 'default', className, children, ...props }: BadgeProps) {
  return (
    <span
      className={cn(
        'inline-flex items-center gap-1 rounded-full px-2.5 py-0.5 text-xs font-medium',
        variants[variant],
        className,
      )}
      {...props}
    >
      {children}
    </span>
  );
}

export { Badge };
export type { BadgeProps };
