import * as React from 'react';
import { Slot } from '@radix-ui/react-slot';
import { cva, type VariantProps } from 'class-variance-authority';

import { cn } from '@/lib/utils';

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium transition-all disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg:not([class*='size-'])]:size-4 shrink-0 [&_svg]:shrink-0 outline-none focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px] aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive",
  {
    variants: {
      variant: {
        primary: 'bg-primary cursor-pointer text-primary-foreground font-semibold  hover:bg-primary/90 focus-visible:ring-primary/20 ',
        default: 'text-primary-foreground shadow-xs ',
        accent: 'bg-accent text-background shadow-xs hover:bg-accent/80',
        destructive: 'bg-destructive text-white shadow-xs hover:bg-destructive/90 focus-visible:ring-destructive/20 ',
        outline: 'border bg-foreground text-primary-foreground shadow-xs hover:bg-accent hover:text-white ',
        secondary: 'bg-secondary text-secondary-foreground shadow-xs hover:bg-secondary/80',
        ghost: 'cursor-pointer bg-transparent text-secondary ',
        link: 'text-primary underline-offset-4 hover:underline',
        astra: 'bg-white',
        tdc: 'bg-accent rounded-2xl text-background shadow-xs hover:bg-accent/80',
      },
      size: {
        default: 'h-9 px-4 py-2 has-[>svg]:px-3',
        sm: 'h-8 rounded-md gap-1.5 px-3 has-[>svg]:px-2.5',
        lg: 'rounded-xl px-12 py-3',
        icon: 'size-9',
        xl: 'rounded-xl lg:px-12 px-2 py-2  lg:py-4',
        full: 'h-full rounded-md px-6 has-[>svg]:px-4',
      },
    },
    defaultVariants: {
      variant: 'default',
      size: 'default',
    },
  }
);

function Button({
  className,
  variant,
  size,
  asChild = false,
  ...props
}: React.ComponentProps<'button'> &
  VariantProps<typeof buttonVariants> & {
    asChild?: boolean;
  }) {
  const Comp = asChild ? Slot : 'button';

  return (
    <Comp
      data-slot="button"
      className={cn(buttonVariants({ variant, size, className }))}
      {...props}
    />
  );
}

export { Button, buttonVariants };
