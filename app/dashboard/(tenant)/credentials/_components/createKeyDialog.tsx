"use client";

import CustomDialog from "@/components/custom/dialog";
import Typography from "@/components/custom/typography";
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
import { zodResolver } from "@hookform/resolvers/zod";
import { FC } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";

interface CreateKeyDialogProps {}

export const createCredentialsFormSchema = z.object({
  name: z.string().min(3),
  description: z.string().min(10),
  key: z.string().min(10),
});

type CreateCredentialsFormValues = z.infer<typeof createCredentialsFormSchema>;

const CreateKeyDialog: FC<CreateKeyDialogProps> = () => {
  const form = useForm<CreateCredentialsFormValues>({
    resolver: zodResolver(createCredentialsFormSchema),
    mode: "onChange",
  });

  const onSubmit = (data: CreateCredentialsFormValues) => {
    return toast(
      <div>
        <pre>{JSON.stringify(data, null, 2)}</pre>
      </div>
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
            name="key"
            render={({ field }) => (
              <FormItem>
                <Typography variant={"formFieldTitle"}>Key</Typography>
                <FormControl>
                  <Input placeholder="Key..." {...field} />
                </FormControl>
                <FormDescription>
                  lorem ipsum dolor sit amet, consectetur adipiscing elit.
                </FormDescription>
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
