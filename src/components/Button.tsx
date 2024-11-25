import { cva, VariantProps } from "class-variance-authority";
import { ComponentProps } from "react";
import { twMerge } from "tailwind-merge";

// Define button styles with improved color variants and hover effects
const buttonStyles = cva(
  ["transition-colors", "font-medium", "focus:outline-none", "focus:ring"],
  {
    variants: {
      variant: {
        default: [
          "bg-blue-400",
          "text-white",
          "hover:bg-blue-600",
          "focus:ring-blue-300",
        ],
        ghost: [
          "bg-transparent",
          "text-gray-700",
          "hover:bg-gray-100",
          "focus:ring-gray-300",
        ],
        dark: [
          "bg-secondary-dark",
          "hover:bg-secondary-dark-hover",
          "text-secondary",
        ],
      },
      size: {
        default: ["rounded", "px-4", "py-2", "text-sm"],
        large: ["rounded-lg", "px-6", "py-3", "text-base"],
        icon: [
          "rounded-full",
          "w-10",
          "h-10",
          "flex",
          "items-center",
          "justify-center",
          "p-2.5",
        ],
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
);

type ButtonProps = VariantProps<typeof buttonStyles> & ComponentProps<"button">;

export function Button({ variant, size, className, ...props }: ButtonProps) {
  return (
    <button
      {...props}
      className={twMerge(buttonStyles({ variant, size }), className)}
    />
  );
}
