"use client";

import CustomDialog from "@/components/custom/dialog";
import { Button } from "@/components/ui/button";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { cn } from "@/lib/utils";
import { Input } from "@/components/ui/input";
import Typography from "@/components/custom/typography";
import { toast } from "sonner";
import { useMutation } from "@tanstack/react-query";
import { createEvent } from "@/actions/eventRegistries";
import { useEnvironmentContext } from "@/context/envContext";

export const addEventFormSchema = z.object({
  name: z.string().min(2, {
    message: "Event name must be at least 2 characters long",
  }),
});

type AddEventFormValues = z.infer<typeof addEventFormSchema>;

const AddEventDialog = ({ eventRegistryId }: { eventRegistryId: string }) => {
  const { workspace, tenant } = useEnvironmentContext();
  const form = useForm<AddEventFormValues>({
    resolver: zodResolver(addEventFormSchema),
  });

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
      formData: z.infer<typeof addEventFormSchema>;
    }) => createEvent(tenantId, workspaceId, eventRegistryId, formData),
  });

  const onSubmit = (data: AddEventFormValues) => {
    return toast.promise(
      mutateAsync({
        tenantId: tenant!.id,
        workspaceId: workspace!.id,
        eventRegistryId: eventRegistryId,
        formData: data,
      }),
      {
        loading: "Creating event...",
        success: "Event created successfully",
        error: "An error occurred while creating event",
      }
    );
  };

  const trigger = <Button>Add New Event</Button>;

  return (
    <CustomDialog trigger={trigger}>
      <Typography variant="formHeading">Add New Event</Typography>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="space-y-2 flex flex-col"
        >
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <Typography variant={"formFieldTitle"}>Name</Typography>
                <FormControl>
                  <Input placeholder="Event Name..." {...field} />
                </FormControl>
                <FormDescription>
                  lorem ipsum dolor sit amet, consectetur adipiscing elit.
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button type="submit">Create Event</Button>
        </form>
      </Form>
    </CustomDialog>
  );
};

export default AddEventDialog;
