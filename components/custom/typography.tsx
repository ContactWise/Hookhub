import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/lib/utils";

const typographyVariants = cva("transition-colors", {
  variants: {
    variant: {
      pageTitle: "text-4xl md:text-3xl lg:text-4xl font-semibold",
      subTItle: "text-2xl md:text-xl lg:text-2xl font-semibold",
      pageDescription: "text-sm lg:text-md",
      tableHeading: "text-lg md:text-md lg:text-lg font-semibold",
      tableText: "text-base md:text-lg lg:text-xl",
      tableDescription: "text-sm md:text-base lg:text-lg",
      formHeading: "text-xl md:text-xl lg:text-2xl font-semibold",
      formDescription: "text-xl md:text-2xl lg:text-3xl",
      formFieldTitle: "text-lg md:text-xl lg:text-lg font-semibold",
      formFieldDescription: "text-sm md:text-base lg:text-lg",
      cardTitle:
        "font-semibold leading-none tracking-tight text-lg md:text-md lg:text-lg",
      cardDescription: "text-sm md:text-md lg:text-md text-gray-500",
    },
    align: {
      left: "text-left",
      center: "text-center",
      right: "text-right",
    },
    textColor: {
      "gray-700": "text-gray-700",
      "green-700": "text-green-700",
    },
    transform: {
      uppercase: "uppercase",
      lowercase: "lowercase",
      capitalize: "capitalize",
      default: "",
    },
  },
  defaultVariants: {
    variant: "pageTitle",
    align: "left",
    textColor: "gray-700",
    transform: "default",
  },
});

export interface TypographyProps
  extends React.HTMLAttributes<HTMLParagraphElement>,
    VariantProps<typeof typographyVariants> {}

const Typography = React.forwardRef<HTMLParagraphElement, TypographyProps>(
  ({ className, variant, align, textColor, transform, ...props }, ref) => {
    return (
      <p
        className={cn(
          typographyVariants({
            variant,
            align,
            textColor,
            transform,
            className,
          })
        )}
        ref={ref}
        {...props}
      />
    );
  }
);

Typography.displayName = "Typography";
export default Typography;
