"use client";

import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";

import Link from "next/link";
import { zodResolver } from "@hookform/resolvers/zod";
import { useFieldArray, useForm } from "react-hook-form";
import { z } from "zod";

import { cn } from "@/lib/utils";
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
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { MultiSelect } from "@/components/multiselect";
import { FC, useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import Typography from "@/components/custom/typography";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "sonner";
import { createService } from "@/actions/services";
import { useEnvironmentContext } from "@/context/envContext";

type ApplicationFormValues = z.infer<typeof applicationFormSchema>;
const applicationFormSchema = z.object({
  name: z.string().min(3),
  description: z.string().min(10),
  // url: z.string().url(),
});

interface CreateApplicationSheetProps {
  children: React.ReactNode;
}

const CreateServiceSheet: FC<CreateApplicationSheetProps> = ({ children }) => {
  const { tenant, workspace } = useEnvironmentContext();

  const form = useForm<ApplicationFormValues>({
    resolver: zodResolver(applicationFormSchema),
    mode: "onChange",
  });
  const onSubmit = async (data: ApplicationFormValues) => {
    const res = await createService(tenant!.id, workspace!.id, data);
    return toast(
      <div>
        <pre>{JSON.stringify(data, null, 2)}</pre>
      </div>
    );
  };

  return (
    <Sheet>
      <SheetTrigger asChild>{children}</SheetTrigger>
      <SheetContent className="w-full sm:max-w-[550px]">
        <SheetHeader>
          <Typography variant="formHeading">Create New Application</Typography>
        </SheetHeader>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="space-y-8 flex-col mt-2"
          >
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>
                    {" "}
                    <Typography variant={"formFieldTitle"}>
                      Application Name
                    </Typography>
                  </FormLabel>
                  <FormControl>
                    <Input placeholder="Application name..." {...field} />
                  </FormControl>
                  <FormDescription>
                    lorem ipsum dolor sit amet, consectetur adipiscing elit.
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="description"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>
                    {" "}
                    <Typography variant={"formFieldTitle"}>
                      Application Description
                    </Typography>
                  </FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder="Application Description..."
                      className="resize-none"
                      {...field}
                    />
                  </FormControl>
                  <FormDescription>
                    lorem ipsum dolor sit amet, consectetur adipiscing elit.
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            {/* <FormField
              control={form.control}
              name="url"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>
                    {" "}
                    <Typography variant={"formFieldTitle"}>
                      Application URL
                    </Typography>
                  </FormLabel>
                  <FormControl>
                    <Input placeholder="Application URL..." {...field} />
                  </FormControl>
                  <FormDescription>
                    lorem ipsum dolor sit amet, consectetur adipiscing elit.
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            /> */}

            <Button type="submit">Create Service</Button>
          </form>
        </Form>
      </SheetContent>
    </Sheet>
  );
};

export default CreateServiceSheet;
