import { cn } from "@/lib/utils";
import { Slot } from "@radix-ui/react-slot";
import { type VariantProps, cva } from "class-variance-authority";
import React, { type ComponentProps, isValidElement } from "react";
import { type BoxProps, boxVariants } from "./box";
import { Stack } from "./stack";

const cardVariants = cva(
  "group relative flex flex-col items-start gap-4 w-full border bg-card p-5 rounded-lg transform-gpu ring-4 ring-inset ring-background hover:[&[href]]:bg-accent",
  {
    variants: {
      variant: {
        default: "bg-card",
        accent: "bg-accent",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  },
);

type SpecialCardProps = ComponentProps<"div"> &
  BoxProps &
  VariantProps<typeof cardVariants> & {
    /**
     * If set to `true`, the button will be rendered as a child within the component.
     * This child component must be a valid React component.
     */
    asChild?: boolean;
  };

const SpecialCard = ({
  className,
  hover = true,
  focus = true,
  asChild,
  ...props
}: SpecialCardProps) => {
  const useAsChild = asChild && isValidElement(props.children);
  const Comp: React.ElementType = useAsChild ? Slot : "div";

  return (
    <Comp
      data-slot="card"
      className={cn(boxVariants({ hover, focus }), cardVariants({ className }))}
      {...props}
    />
  );
};

const SpecialCardHeader = ({ className, ...props }: ComponentProps<typeof Stack>) => {
  return <Stack className={cn("w-full", className)} {...props} />;
};

const SpecialCardFooter = ({ className, ...props }: ComponentProps<typeof Stack>) => {
  return <Stack size="sm" className={cn("text-muted-foreground text-xs", className)} {...props} />;
};

const SpecialCardDescription = ({ className, ...props }: ComponentProps<"div">) => {
  return (
    <div
      className={cn("text-secondary-foreground line-clamp-2 text-sm/normal text-pretty", className)}
      {...props}
    />
  );
};

const SpecialCardBadges = ({
  className,
  size = "sm",
  ...props
}: ComponentProps<typeof Stack> & { size?: string }) => {
  return (
    <Stack
      size={size}
      className={cn("absolute inset-x-5 top-0 z-10 -translate-y-1/2", className)}
      {...props}
    />
  );
};

const SpecialCardBg = ({ className, ...props }: ComponentProps<"div">) => {
  return (
    <div
      className={cn(
        "pointer-events-none absolute inset-x-1 top-1 -z-10 h-24 overflow-clip rounded-lg",
        className,
      )}
      {...props}
    >
      <div className="bg-primary/10 -mt-12 size-full -rotate-12 rounded-full blur-xl" />
    </div>
  );
};

const SpecialCardIcon = ({ children, className, ...props }: ComponentProps<"div">) => {
  return (
    <div
      className={cn(
        "pointer-events-none absolute inset-1 overflow-clip rounded-sm opacity-10",
        className,
      )}
      {...props}
    >
      <Slot className="absolute -top-20 -right-20 -z-10 size-60 rotate-12 mask-b-from-25 mask-l-from-25">
        {children}
      </Slot>
    </div>
  );
};

const SpecialCardContent = ({ className, ...props }: ComponentProps<"div">) => {
  return <div className={cn("w-full px-6", className)} {...props} />;
};

const SpecialCardTitle = ({ className, ...props }: ComponentProps<"div">) => {
  return <div className={cn("text-lg font-semibold", className)} {...props} />;
};

export {
  SpecialCard,
  SpecialCardBadges,
  SpecialCardBg,
  SpecialCardContent,
  SpecialCardDescription,
  SpecialCardFooter,
  SpecialCardHeader,
  SpecialCardIcon,
  SpecialCardTitle,
  cardVariants,
  type SpecialCardProps,
};
