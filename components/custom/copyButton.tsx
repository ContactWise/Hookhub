"use client";

import { FC } from "react";
import { Button, ButtonProps } from "../ui/button";
import { toast } from "sonner";

export interface CopyButtonProps extends ButtonProps {
  value: string;
  children: React.ReactNode;
}

const CopyButton: FC<CopyButtonProps> = ({ value, children, ...props }) => {
  const copyValue = (value: string) => {
    navigator.clipboard.writeText(value);
    toast.success("Copied to clipboard");
  };
  return (
    <Button
      {...props}
      onClick={() => {
        copyValue(value);
      }}
    >
      {children}
    </Button>
  );
};

export default CopyButton;
