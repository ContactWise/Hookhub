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
import { FC, useEffect, useState } from "react";
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
import { createService, getServiceById } from "@/actions/services";
import { useEnvironmentContext } from "@/context/envContext";
import { useQuery } from "@tanstack/react-query";
import { Pen } from "lucide-react";

type EditServiceFormValues = z.infer<typeof editServiceFormSchema>;
const editServiceFormSchema = z.object({
  name: z.string().min(3),
  description: z.string().min(10),
});

interface EditServiceSheetProps {
  serviceId: string;
  //   children: React.ReactNode;
}

const EditServiceSheet: FC<EditServiceSheetProps> = ({
  //   children,
  serviceId,
}) => {
  const { tenant, workspace } = useEnvironmentContext();

  const { data, isFetched, error, isLoading } = useQuery({
    queryKey: ["getTenant", serviceId],
    queryFn: () => getServiceById(tenant!.id, workspace!.id, serviceId),
  });

  const form = useForm<EditServiceFormValues>({
    resolver: zodResolver(editServiceFormSchema),
    mode: "onSubmit",
  });

  useEffect(() => {
    if (isFetched && data) {
      form.reset(data.data);
    }
  }, [isFetched, data, form.reset]);

  const onSubmit = async (data: EditServiceFormValues) => {
    const res = await createService(tenant!.id, workspace!.id, data);
    return toast(
      <div>
        <pre>{JSON.stringify(data, null, 2)}</pre>
      </div>
    );
  };

  return (
    <Sheet>
      <SheetTrigger asChild>
        <div className="flex gap-2  items-center">
          <Pen size={14} />
          <span>Edit Service</span>
        </div>
      </SheetTrigger>
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
              disabled={!!error || isLoading}
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
              disabled={!!error || isLoading}
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

            <Button disabled={!!error || isLoading} type="submit">
              Create Service
            </Button>
          </form>
        </Form>
      </SheetContent>
    </Sheet>
  );
};

export default EditServiceSheet;
