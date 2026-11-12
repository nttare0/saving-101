import { cva } from 'class-variance-authority';
import type { VariantProps } from 'class-variance-authority';

export { default as Button } from './Button.vue';

export const buttonVariants = cva(
  'inline-flex shrink-0 gap-2 items-center justify-center rounded-md whitespace-nowrap text-sm font-medium transition-[color,background-color,border-color,box-shadow] outline-none focus-visible:ring-[3px] focus-visible:ring-ring/50 disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:shrink-0',
  {
    variants: {
      variant: {
        default: 'bg-primary text-primary-foreground shadow-xs hover:bg-primary/90',
        destructive:
          'bg-destructive text-destructive-foreground shadow-xs hover:bg-destructive/90 focus-visible:ring-destructive/30',
        outline:
          'border border-border bg-background shadow-xs hover:bg-accent hover:text-accent-foreground dark:border-input dark:bg-input/30 dark:hover:bg-input/50',
        secondary:
          'bg-secondary text-secondary-foreground shadow-[inset_0_0_0_1px_var(--secondary-border)] hover:bg-secondary-hover',
        ghost: 'hover:bg-accent hover:text-accent-foreground dark:hover:bg-accent/50',
        'ghost-destructive':
          'text-destructive-text hover:bg-destructive/10 hover:text-destructive-text dark:hover:bg-destructive/20',
        'soft-destructive':
          'bg-destructive/10 text-destructive-text hover:bg-destructive/20 dark:bg-destructive/20 dark:hover:bg-destructive/30',
        'ghost-primary': 'text-primary-text hover:bg-primary/10 hover:text-primary-text',
        'soft-primary': 'bg-primary/10 text-primary-text hover:bg-primary/15',
        success: 'bg-success text-success-foreground shadow-xs hover:bg-success/90',
        'outline-success':
          'border border-success-text/30 text-success-text bg-background shadow-xs hover:bg-success-text/10',
        'ghost-success': 'text-success-text hover:bg-success-text/10 hover:text-success-text',
        'soft-success': 'bg-success-text/15 text-success-text hover:bg-success-text/25',
        link: 'text-primary-text underline-offset-4 hover:underline',
      },
      size: {
        default: 'h-10 px-4 py-2',
        sm: 'h-9 px-3',
        lg: 'h-11 px-8',
        icon: 'size-10',
        'icon-sm': 'size-8',
      },
    },
    defaultVariants: {
      variant: 'default',
      size: 'default',
    },
  },
);

export interface ButtonVariantProps extends VariantProps<typeof buttonVariants> {}
