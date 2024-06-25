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
import { cn } from "@/lib/utils";
import { zodResolver } from "@hookform/resolvers/zod";
import { PlusCircle } from "lucide-react";
import { FC } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";

export const createWorkspaceFormSchema = z.object({
  name: z.string().min(3),
  description: z.string().min(10),
});

type CreateWorkspaceFormValues = z.infer<typeof createWorkspaceFormSchema>;

const CreateWorkspaceDialog: FC = () => {
  const form = useForm<CreateWorkspaceFormValues>({
    resolver: zodResolver(createWorkspaceFormSchema),
    mode: "onChange",
  });

  const onSubmit = (data: CreateWorkspaceFormValues) => {
    return toast(
      <div>
        <pre>{JSON.stringify(data, null, 2)}</pre>
      </div>
    );
  };

  const trigger = (
    <button
      className={cn(
        "mt-2 flex flex-col items-center gap-2 rounded-lg border-dashed border-muted-foreground border-2 p-1 w-full text-left text-sm transition-all hover:bg-accent"
      )}
    >
      <div className="flex w-full items-center gap-3">
        <div className="flex items-center">
          <div className="flex items-center gap-2 text-muted-foreground">
            <PlusCircle />
            {/* <div className="font-semibold">hello</div> */}
          </div>
        </div>
        <div className="line-clamp-2 text-xs text-muted-foreground">
          Add New Workspace
        </div>
      </div>
    </button>
  );

  return (
    <CustomDialog trigger={trigger}>
      <Typography variant="formHeading">Create New Workspace</Typography>
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
                  <Input placeholder="Workspace Name..." {...field} />
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
                  <Input placeholder="Workspace Description..." {...field} />
                </FormControl>
                <FormDescription>
                  lorem ipsum dolor sit amet, consectetur adipiscing elit.
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button className="self-end" type="submit">
            Create Workspace
          </Button>
        </form>
      </Form>
    </CustomDialog>
  );
};

export default CreateWorkspaceDialog;
