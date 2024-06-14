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

export const addEventFormSchema = z.object({
  eventName: z.string().min(2, {
    message: "Username must be at least 2 characters.",
  }),
  eventDescription: z.string().min(10, {
    message: "Event description must be at least 10 characters.",
  }),
});

type AddEventFormValues = z.infer<typeof addEventFormSchema>;

const AddEventDialog = () => {
  const form = useForm<AddEventFormValues>({
    resolver: zodResolver(addEventFormSchema),
  });
  const onSubmit = (data: AddEventFormValues) => {
    return toast(
      <div>
        <pre>{JSON.stringify(data, null, 2)}</pre>
      </div>
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
            name="eventName"
            render={({ field }) => (
              <FormItem>
                <Typography variant={"formFieldTitle"}>Event Name</Typography>
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
          <FormField
            control={form.control}
            name="eventDescription"
            render={({ field }) => (
              <FormItem>
                <Typography variant={"formFieldTitle"}>
                  Event Description
                </Typography>
                <FormControl>
                  <Input placeholder="Event Description..." {...field} />
                </FormControl>
                <FormDescription>
                  lorem ipsum dolor sit amet, consectetur adipiscing elit.
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button type="submit">Submit</Button>
        </form>
      </Form>
    </CustomDialog>
  );
};

export default AddEventDialog;
