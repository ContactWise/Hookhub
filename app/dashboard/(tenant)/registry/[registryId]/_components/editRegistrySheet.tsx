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
import { useMutation, useQuery } from "@tanstack/react-query";
import { Pen } from "lucide-react";
import {
  getEventRegistryById,
  updateEventRegistry,
} from "@/actions/eventRegistries";

type EditRegistryFormValues = z.infer<typeof editRegistryFormSchema>;
const editRegistryFormSchema = z.object({
  name: z.string().min(3),
  description: z.string().min(10),
});

interface EditRegistrySheetProps {
  registryId: string;
}

const EditRegistrySheet: FC<EditRegistrySheetProps> = ({
  //   children,
  registryId,
}) => {
  const { tenant, workspace } = useEnvironmentContext();

  const { data, isFetched, error, isLoading } = useQuery({
    queryKey: ["getRegistry", registryId],
    queryFn: () => getEventRegistryById(tenant!.id, workspace!.id, registryId),
  });

  const form = useForm<EditRegistryFormValues>({
    resolver: zodResolver(editRegistryFormSchema),
    mode: "onSubmit",
  });

  useEffect(() => {
    if (isFetched && data) {
      form.reset(data);
    }
  }, [isFetched, data, form.reset]);

  const { mutateAsync } = useMutation({
    mutationFn: ({
      tenantId,
      workspaceId,
      eventRegistryId,
      formData,
    }: {
      tenantId: string;
      workspaceId: string;
      eventRegistryId: string;
      formData: z.infer<typeof editRegistryFormSchema>;
    }) => updateEventRegistry(tenantId, workspaceId, eventRegistryId, formData),
  });
  const onSubmit = async (data: EditRegistryFormValues) => {
    return toast.promise(
      mutateAsync({
        tenantId: tenant!.id,
        workspaceId: workspace!.id,
        eventRegistryId: registryId,
        formData: data,
      }),
      {
        loading: "Updating registry...",
        success: "Registry updated successfully",
        error: "An error occurred while updating registry",
      }
    );
  };

  return (
    <Sheet>
      <SheetTrigger asChild>
        <div className="flex gap-2  items-center">
          <span>Edit Registry</span>
        </div>
      </SheetTrigger>
      <SheetContent className="w-full sm:max-w-[550px]">
        <SheetHeader>
          <Typography variant="formHeading">Edit Registry</Typography>
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
                      Registry Name
                    </Typography>
                  </FormLabel>
                  <FormControl>
                    <Input placeholder="Registry name..." {...field} />
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
                      Registry Description
                    </Typography>
                  </FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder="Registry Description..."
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
              Update Registry
            </Button>
          </form>
        </Form>
      </SheetContent>
    </Sheet>
  );
};

export default EditRegistrySheet;
