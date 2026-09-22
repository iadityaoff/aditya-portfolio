import * as React from "react";
import Link from "next/link";
import { cn } from "@/lib/utils";

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "ghost" | "dark" | "outline-dark";
  size?: "sm" | "md" | "lg";
  href?: string;
  iconRight?: React.ReactNode;
  loading?: boolean;
}

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      className,
      variant = "primary",
      size = "md",
      href,
      iconRight,
      loading = false,
      children,
      disabled,
      ...props
    },
    ref
  ) => {
    const baseStyles =
      "inline-flex items-center justify-center font-medium rounded-full transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 active:scale-[0.98] disabled:opacity-50 disabled:pointer-events-none cursor-pointer";

    const sizeStyles = {
      sm: "text-xs px-3.5 py-1.5 h-8 gap-1.5 min-h-[36px]",
      md: "text-sm px-5 py-2.5 h-11 gap-2 min-h-[44px]",
      lg: "text-base px-6 py-3.5 h-13 gap-2.5 min-h-[48px]",
    };

    const variantStyles = {
      primary:
        "bg-accent text-white hover:bg-accent-hover shadow-sm hover:shadow hover:-translate-y-0.5",
      secondary:
        "bg-transparent text-ink border border-line hover:border-ink/40 hover:bg-white hover:-translate-y-0.5",
      ghost:
        "bg-transparent text-muted hover:text-ink hover:bg-black/5",
      dark:
        "bg-white text-ink hover:bg-white/90 shadow-sm hover:-translate-y-0.5",
      "outline-dark":
        "bg-transparent text-white border border-showcase-border hover:border-white/40 hover:bg-white/5 hover:-translate-y-0.5",
    };

    const combinedClassName = cn(
      baseStyles,
      sizeStyles[size],
      variantStyles[variant],
      className
    );

    const content = (
      <>
        {loading && (
          <svg
            className="animate-spin -ml-1 mr-2 h-4 w-4 text-current"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            aria-hidden="true"
          >
            <circle
              className="opacity-25"
              cx="12"
              cy="12"
              r="10"
              stroke="currentColor"
              strokeWidth="4"
            ></circle>
            <path
              className="opacity-75"
              fill="currentColor"
              d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
            ></path>
          </svg>
        )}
        <span>{children}</span>
        {iconRight && !loading && (
          <span className="transition-transform duration-200 group-hover:translate-x-0.5">
            {iconRight}
          </span>
        )}
      </>
    );

    if (href) {
      return (
        <Link href={href} className={cn("group", combinedClassName)}>
          {content}
        </Link>
      );
    }

    return (
      <button
        ref={ref}
        disabled={disabled || loading}
        className={cn("group", combinedClassName)}
        {...props}
      >
        {content}
      </button>
    );
  }
);

Button.displayName = "Button";
