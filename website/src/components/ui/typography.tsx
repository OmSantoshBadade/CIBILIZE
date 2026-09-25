import { cn } from "@/lib/utils";
import { HTMLAttributes } from "react";

const Typography = {
  BlockQuote: ({ children }: { children: React.ReactNode }) => {
    return <blockquote className="mt-6 border-l-2 pl-6">{children}</blockquote>;
  },

  H1: ({
    children,
    className,
    style,
  }: {
    children: React.ReactNode;
    className?: string;
    style?: React.CSSProperties;
  }) => {
    return (
      <h1
        className={cn("scroll-m-20 text-3xl font-extrabold tracking-normal", className)}
        style={style}
      >
        {children}
      </h1>
    );
  },

  H2: ({ children, className }: { children: React.ReactNode; className?: string }) => {
    return (
      <h2 className={cn(className, "scroll-m-20 text-2xl font-semibold tracking-tight first:mt-0")}>
        {children}
      </h2>
    );
  },

  H3: ({ children, className }: { children: React.ReactNode; className?: string }) => {
    return (
      <h3 className={cn("scroll-m-20 text-xl font-semibold tracking-tight", className)}>
        {children}
      </h3>
    );
  },

  H4: ({
    children,
    className,
    style,
  }: {
    children: React.ReactNode;
    className?: string;
    style?: React.CSSProperties;
  }) => {
    return (
      <h4
        className={cn("scroll-m-20 text-lg font-semibold tracking-tight", className)}
        style={style}
      >
        {children}
      </h4>
    );
  },

  H5: ({ children, className }: { children: React.ReactNode; className?: string }) => {
    return (
      <h5 className={cn("scroll-m-20 text-base font-semibold tracking-tight", className)}>
        {children}
      </h5>
    );
  },

  H6: ({ children, className }: { children: React.ReactNode; className?: string }) => {
    return (
      <h6 className={cn("scroll-m-20 text-sm font-semibold tracking-tight", className)}>
        {children}
      </h6>
    );
  },
  InlineCode: ({ children, className }: { children: React.ReactNode; className?: string }) => {
    return (
      <code className={cn("text-primary relative rounded px-1 py-0.5 text-sm", className)}>
        {children}
      </code>
    );
  },

  Lead: ({ children, className }: { children: React.ReactNode; className?: string }) => {
    return (
      <p className={cn("text-muted-foreground mt-4 ml-1 text-lg tracking-normal", className)}>
        {children}
      </p>
    );
  },

  P: ({ children, className }: { children: React.ReactNode; className?: string }) => {
    return (
      <p className={cn("text-muted-foreground mt-1 text-base leading-7", className)}>{children}</p>
    );
  },

  Bold: ({ children, className }: { children: React.ReactNode; className?: string }) => {
    return <span className={cn("font-semibold", className)}>{children}</span>;
  },

  Large: ({ children, className }: HTMLAttributes<HTMLDivElement>) => {
    return <div className={cn("text-lg font-semibold", className)}>{children}</div>;
  },

  Small: ({ children, className }: { children: React.ReactNode; className?: string }) => {
    return <small className={cn("text-sm leading-none font-medium", className)}>{children}</small>;
  },

  Muted: ({ children, className }: { children: React.ReactNode; className?: string }) => {
    return <p className={cn("text-muted-foreground text-sm", className)}>{children}</p>;
  },

  Label: ({
    children,
    className,
    variant = "sm",
  }: {
    children: React.ReactNode;
    className?: string;
    variant?: "xs" | "sm" | "md" | "lg";
  }) => {
    return (
      <h3
        className={cn(
          "text-muted-foreground px-1 text-base font-medium",
          className,
          variant === "xs" && "text-[0.8rem]",
          variant === "sm" && "text-sm",
          variant === "md" && "text-base",
          variant === "lg" && "text-lg",
        )}
      >
        {children}
      </h3>
    );
  },
  SubLabel: ({ children, className }: { children: React.ReactNode; className?: string }) => {
    return (
      <h3 className={cn("text-muted-foreground px-1 text-sm font-medium", className)}>
        {children}
      </h3>
    );
  },
  Heading: ({
    children,
    className,
    variant = "sm",
  }: {
    children: React.ReactNode;
    className?: string;
    variant?: "sm" | "md" | "lg" | "xl" | "2xl" | "3xl" | "4xl" | "5xl" | "6xl";
  }) => {
    return (
      <h3
        className={cn(
          "text-primary",
          className,
          variant === "sm" && "text-sm font-medium",
          variant === "md" && "text-base font-medium",
          variant === "lg" && "text-lg font-semibold",
          variant === "xl" && "text-xl font-semibold",
          variant === "2xl" && "text-2xl font-semibold",
          variant === "3xl" && "text-3xl font-semibold",
          variant === "4xl" && "text-4xl font-semibold",
          variant === "5xl" && "text-5xl font-semibold",
          variant === "6xl" && "text-6xl font-semibold",
        )}
      >
        {children}
      </h3>
    );
  },
  SubHeading: ({
    children,
    className,
    variant = "sm",
  }: {
    children: React.ReactNode;
    className?: string;
    variant?: "xs" | "sm" | "md" | "lg";
  }) => {
    return (
      <h3
        className={cn(
          "text-muted-foreground text-sm font-medium",
          className,
          variant === "xs" && "text-xs font-medium",
          variant === "sm" && "text-sm font-medium",
          variant === "md" && "text-base font-medium",
          variant === "lg" && "text-lg font-semibold",
        )}
      >
        {children}
      </h3>
    );
  },
};

export default Typography;
