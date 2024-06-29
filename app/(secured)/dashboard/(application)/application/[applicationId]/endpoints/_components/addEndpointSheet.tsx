"use client";

import Link from "next/link";
import { zodResolver } from "@hookform/resolvers/zod";
import { useFieldArray, useForm } from "react-hook-form";
import { z } from "zod";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

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
import { useState } from "react";
import Typography from "@/components/custom/typography";
import { MultiSelect } from "@/components/multiselect";
import { toast } from "sonner";
// import { Textarea } from "@/components/ui/textarea";
// import { toast } from "@/components/ui/use-toast";
const CreateEndpointForm = () => {
  const endpointFormSchema = z.object({
    name: z.string(),
    url: z.string().url(),
    headers: z.array(
      z
        .object({
          key: z.string(),
          value: z.string(),
        })
        .optional()
    ),

    eventRegistry: z.string({
      message: "Event Registry is required",
    }),
    events: z.array(z.string()),
  });

  const eventList = [
    { value: "sms_sent", label: "SMS_SENT" },
    { value: "sms_failed", label: "SMS_FAILED" },
    { value: "dummy_event", label: "DUMMY_EVENT" },
  ];

  const form = useForm<EndpointFormValues>({
    resolver: zodResolver(endpointFormSchema),
    mode: "onChange",
  });

  const { fields, append } = useFieldArray({
    name: "headers",
    control: form.control,
  });

  function onSubmit(data: EndpointFormValues) {
    return toast(
      <div>
        <pre>{JSON.stringify(data, null, 2)}</pre>
      </div>
    );
  }

  const [selectedEvents, setSelectedEvents] = useState<string[]>([]);

  type EndpointFormValues = z.infer<typeof endpointFormSchema>;

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="space-y-8 flex flex-col "
      >
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>
                {" "}
                <Typography variant={"formFieldTitle"}>
                  Endpoint Name
                </Typography>
              </FormLabel>
              <FormControl>
                <Input placeholder="Endpoint name..." {...field} />
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
          name="url"
          render={({ field }) => (
            <FormItem>
              <FormLabel>
                {" "}
                <Typography variant={"formFieldTitle"}>Endpoint URL</Typography>
              </FormLabel>
              <FormControl>
                <Input placeholder="Endpoint URL..." {...field} />
              </FormControl>
              <FormDescription>
                lorem ipsum dolor sit amet, consectetur adipiscing elit.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <div className="w-full">
          <div className="flex justify-between items-center">
            <Typography variant={"formFieldTitle"}>Headers</Typography>
            <Button
              variant={"secondary"}
              type="button"
              size={"sm"}
              className=" col-span-4"
              onClick={() => append({ key: "", value: "" })}
            >
              Add New Header
            </Button>
          </div>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Key</TableHead>
                <TableHead>Value</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {fields.map((field, index) => (
                <TableRow key={index}>
                  <TableCell>
                    <FormField
                      control={form.control}
                      name={`headers.${index}.key`}
                      render={({ field }) => (
                        <FormItem>
                          <FormControl>
                            <Input {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </TableCell>
                  <TableCell>
                    <FormField
                      control={form.control}
                      name={`headers.${index}.value`}
                      render={({ field }) => (
                        <FormItem>
                          <FormControl>
                            <Input {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
        <FormField
          control={form.control}
          name="eventRegistry"
          render={({ field }) => (
            <FormItem>
              <Typography variant={"formFieldTitle"}>
                Select Registry
              </Typography>
              <Select onValueChange={field.onChange}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Select a verified email to display" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  <SelectItem value="sms_registry">SMS Registry</SelectItem>

                  <SelectItem value="whatsapp_registry">
                    Whatsapp Registry
                  </SelectItem>
                </SelectContent>
              </Select>
              <FormDescription>
                lorem ipsum dolor sit amet, consectetur adipiscing elit.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="events"
          render={({ field }) => (
            <FormItem>
              <Typography variant={"formFieldTitle"}>Select Events</Typography>
              <MultiSelect
                options={eventList}
                onValueChange={(val) => {
                  field.onChange(val);
                  setSelectedEvents(val);
                }}
                defaultValue={selectedEvents}
                placeholder="Select frameworks"
                variant="secondary"
                animation={2}
                maxCount={3}
              />
              <FormDescription>
                lorem ipsum dolor sit amet, consectetur adipiscing elit.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button className="self-end" type="submit">
          Create Endpoint
        </Button>
      </form>
    </Form>
  );
};

export default CreateEndpointForm;
