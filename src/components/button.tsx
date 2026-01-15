import { cva, type VariantProps } from "class-variance-authority";
import type { ComponentProps } from "preact";
import { cn } from "../helpers/cn";

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap font-medium transition-all disabled:pointer-events-none disabled:opacity-40 [&_svg]:pointer-events-none [&_svg:not([class*='size-'])]:size-7 shrink-0 [&_svg]:shrink-0 outline-none cursor-pointer",
  {
    variants: {
      variant: {
        default: "bg-muted text-foreground hover:bg-accent/70",
        primary: "bg-primary text-primary-foreground hover:brightness-90",
        secondary: "bg-secondary text-secondary-foreground hover:bg-accent/70",
        selected: "bg-foreground text-background",
        ghost: "hover:bg-accent/70 text-foreground",
        destructive: "bg-destructive text-white hover:brightness-85",
        success: "bg-success text-white hover:brightness-90",
      },
      size: {
        default: "px-10 py-7",
        icon: "aspect-square px-7 py-7",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  },
);

export function Button({
  class: className,
  variant = "default",
  size = "default",
  ...props
}: ComponentProps<"button"> & VariantProps<typeof buttonVariants>) {
  return (
    <button
      class={cn(buttonVariants({ variant, size }), className)}
      {...props}
    />
  );
}
