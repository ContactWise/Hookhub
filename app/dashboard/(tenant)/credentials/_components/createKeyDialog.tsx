"use client";

import CustomDialog from "@/components/custom/dialog";
import Typography from "@/components/custom/typography";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
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
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { cn } from "@/lib/utils";
import { format } from "date-fns";
import { zodResolver } from "@hookform/resolvers/zod";
import { CalendarIcon } from "lucide-react";
import { FC } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";
import { useMutation } from "@tanstack/react-query";
import { createCredential } from "@/actions/credentials";
import { useEnvironmentContext } from "@/context/envContext";
import { credentialsRequestSchema } from "@/schemas/credentials";

interface CreateKeyDialogProps {}

export const createCredentialsFormSchema = z.object({
  name: z.string().min(3),
  description: z.string().min(10),
  expiresAt: z.date({
    required_error: "Expiry is required",
  }),
});

type CreateCredentialsFormValues = z.infer<typeof createCredentialsFormSchema>;

const CreateKeyDialog: FC<CreateKeyDialogProps> = () => {
  const { workspace, tenant } = useEnvironmentContext();
  const form = useForm<CreateCredentialsFormValues>({
    resolver: zodResolver(createCredentialsFormSchema),
    mode: "onBlur",
  });

  const { mutateAsync } = useMutation({
    mutationFn: ({
      tenantId,
      workspaceId,
      formData,
    }: {
      tenantId: string;
      workspaceId: string;
      formData: z.infer<typeof credentialsRequestSchema>;
    }) => createCredential(tenantId, workspaceId, formData),
  });

  const onSubmit = (data: CreateCredentialsFormValues) => {
    const expiryData = data.expiresAt.toISOString();
    return toast.promise(
      mutateAsync({
        tenantId: tenant!.id,
        workspaceId: workspace!.id,
        formData: { ...data, expiresAt: expiryData },
      }),
      {
        loading: "Creating Key...",
        success: "Key Created Successfully",
        error: "Failed to create key",
      }
    );
  };

  const trigger = <Button>Create New Key</Button>;
  return (
    <CustomDialog trigger={trigger}>
      <Typography variant="formHeading">Create New Key</Typography>
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
                  <Input placeholder="Name..." {...field} />
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
                <Typography variant={"formFieldTitle"}>Description</Typography>
                <FormControl>
                  <Input placeholder="Description..." {...field} />
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
            name="expiresAt"
            render={({ field }) => (
              <FormItem className="flex flex-col">
                <FormLabel>Expires At</FormLabel>
                <Popover>
                  <PopoverTrigger asChild>
                    <FormControl>
                      <Button
                        variant={"outline"}
                        className={cn(
                          "w-full pl-3 text-left font-normal",
                          !field.value && "text-muted-foreground"
                        )}
                      >
                        {field.value ? (
                          format(field.value, "PPP")
                        ) : (
                          <span>Pick a date</span>
                        )}
                        <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                      </Button>
                    </FormControl>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0" align="start">
                    <Calendar
                      mode="single"
                      selected={field.value}
                      onSelect={field.onChange}
                      disabled={(date) => date < new Date("1900-01-01")}
                      initialFocus
                    />
                  </PopoverContent>
                </Popover>
                <FormDescription>Set a date for key to expire</FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button className="self-end" type="submit">
            Create Key
          </Button>
        </form>
      </Form>
    </CustomDialog>
  );
};

export default CreateKeyDialog;
