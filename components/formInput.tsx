"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Copy } from "lucide-react";
import { Input } from "@/components/ui/input";
import React from "react";
import { cn } from "@/lib/utils";

interface InputFormProps {
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
  label: string;
  description: string;
}

const formSchema = z.object({
  username: z.string().min(2, {
    message: "Username must be at least 2 characters.",
  }),
});

const InputForm = React.forwardRef<
  HTMLInputElement,
  InputFormProps & React.HTMLAttributes<HTMLInputElement>
>(({ className, leftIcon, rightIcon, label, description, ...props }, ref) => {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
  });

  function onSubmit(data: z.infer<typeof formSchema>) {
    console.log("data", data);
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className=" space-y-6">
        <FormField
          control={form.control}
          name="username"
          render={({ field }) => (
            <FormItem>
              <FormLabel>{label}</FormLabel>
              <FormControl>
                <div className="flex gap-4 items-center">
                  <div className="relative">
                    <span className="absolute left-0 top-0 h-full px-2 py-2 ">
                      {leftIcon}
                    </span>
                    <Input
                      {...field}
                      className={cn(
                        "w-96",
                        leftIcon && "pl-10",
                        rightIcon && "pr-10"
                      )}
                      ref={ref}
                      {...props}
                    />
                    <Button
                      type="button"
                      variant="link"
                      size="sm"
                      className="absolute right-0 top-0 h-full px-2 py-2 hover:bg-transparent"
                    >
                      {rightIcon}
                    </Button>
                  </div>
                  <Button type="submit">Submit</Button>
                </div>
              </FormControl>
              <FormDescription>
                <span>{description}</span>
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
      </form>
    </Form>
  );
});

InputForm.displayName = "InputForm";
export default InputForm;
