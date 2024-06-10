"use client";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { FC } from "react";

interface CustomTriggerDialogProps {
  children: React.ReactNode;
  trigger: React.ReactNode;
}

const CustomDialog: FC<CustomTriggerDialogProps> = ({ children, trigger }) => {
  return (
    <Dialog>
      <DialogTrigger asChild>{trigger}</DialogTrigger>
      <DialogContent>{children}</DialogContent>
    </Dialog>
  );
};

export default CustomDialog;
