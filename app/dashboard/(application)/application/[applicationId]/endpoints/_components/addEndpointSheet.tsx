"use client";

// import { Button } from "@/components/ui/button";
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
import { useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

type EndpointFormValues = z.infer<typeof endpointFormSchema>;

const endpointFormSchema = z.object({
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

const AddEndpointSheet = () => {
  const form = useForm<EndpointFormValues>({
    resolver: zodResolver(endpointFormSchema),
    mode: "onChange",
  });

  const { fields, append } = useFieldArray({
    name: "headers",
    control: form.control,
  });

  function onSubmit(data: EndpointFormValues) {
    console.log("submitting", data);
  }

  const [selectedEvents, setSelectedEvents] = useState<string[]>([]);

  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button size={"sm"}>Create Endpoint</Button>
      </SheetTrigger>
      <SheetContent className="sm:max-w-[550px]">
        <SheetHeader>
          <SheetTitle>Add New Endpoint</SheetTitle>
        </SheetHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
            <FormField
              control={form.control}
              name="url"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Username</FormLabel>
                  <FormControl>
                    <Input placeholder="shadcn" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="w-full">
              <h1 className="text-lg font-semibold">Headers</h1>
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
              <Button
                type="button"
                size="sm"
                className="mt-2 col-span-4"
                onClick={() => append({ key: "", value: "" })}
              >
                Add URL
              </Button>
            </div>
            <FormField
              control={form.control}
              name="eventRegistry"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
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
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="events"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <MultiSelect
                    options={eventList}
                    onValueChange={(val) => {
                      field.onChange(val);
                      setSelectedEvents(val);
                    }}
                    defaultValue={selectedEvents}
                    placeholder="Select frameworks"
                    variant="inverted"
                    animation={2}
                    maxCount={3}
                  />
                  <FormMessage />
                </FormItem>
              )}
            />

            <Button type="submit">Update profile</Button>
          </form>
        </Form>
      </SheetContent>
    </Sheet>
  );
};

export default AddEndpointSheet;
