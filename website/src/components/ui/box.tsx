import { Slot } from "@radix-ui/react-slot";
import type { ComponentProps } from "react";

import { cn } from "@/lib/utils";
import { type VariantProps, cva } from "class-variance-authority";

const boxVariants = cva("border duration-100 ease-out outline-transparent", {
  variants: {
    hover: {
      true: "not-disabled:cursor-pointer hover:not-disabled:outline-[3px] hover:not-disabled:outline-border/50 hover:not-disabled:border-outline",
    },
    focus: {
      true: "focus-visible:outline-[3px] focus-visible:outline-border/50 focus-visible:border-outline",
    },
    focusWithin: {
      true: "focus-within:outline-[3px] focus-within:outline-border/50 focus-within:border-outline",
    },
    none: {},
  },
});

type BoxVariantProps = VariantProps<typeof boxVariants>;
type BoxOmittedProps = "hover" | "focus" | "focusWithin" | "none";
type BoxProps = Omit<ComponentProps<"div">, BoxOmittedProps> & BoxVariantProps;

const Box = ({ hover, focus, focusWithin, className, ...props }: BoxProps) => {
  return <Slot className={cn(boxVariants({ hover, focus, focusWithin }), className)} {...props} />;
};

export { Box, boxVariants, type BoxProps };
