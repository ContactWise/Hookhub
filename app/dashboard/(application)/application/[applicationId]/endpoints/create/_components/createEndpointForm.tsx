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
import { useEffect, useState } from "react";
import Typography from "@/components/custom/typography";
import { MultiSelect } from "@/components/multiselect";
import { toast } from "sonner";
import { Textarea } from "@/components/ui/textarea";
import { PasswordInput } from "@/components/custom/passwordInput";
import { Minus } from "lucide-react";
import { useMutation, useQuery } from "@tanstack/react-query";
import { getEventRegistries, getEvents } from "@/actions/eventRegistries";
import { useEnvironmentContext } from "@/context/envContext";
import { EventRegistryResource } from "@/types";
import { endpointRequestSchema } from "@/schemas/endpoint";
import { createEndpoint } from "@/actions/endpoints";
// import { Textarea } from "@/components/ui/textarea";
// import { toast } from "@/components/ui/use-toast";
const CreateEndpointForm = ({ serviceId }: { serviceId: string }) => {
  const { tenant, workspace } = useEnvironmentContext();

  const endpointFormSchema = z.object({
    name: z.string(),
    description: z.string(),
    url: z.string().url(),
    secret: z.string(),
    subject: z.string(),
    headers: z.array(
      z
        .object({
          key: z.string(),
          value: z.string(),
        })
        .optional()
    ),

    eventRegistryId: z.string({
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
    mode: "onSubmit",
  });

  const eventRegistryValue = form.watch("eventRegistryId");
  const { fields, append, remove } = useFieldArray({
    name: "headers",
    control: form.control,
  });

  const {
    data: registryData,
    error,
    isFetching: isRegistryDataFetching,
    isSuccess: isRegistryDataSuccess,
  } = useQuery({
    queryKey: ["getRegistries"],
    queryFn: () => getEventRegistries(tenant!.id, workspace!.id),
  });

  const {
    data: eventsData,
    isSuccess: isEventsDataSuccess,
    isFetching,
  } = useQuery({
    queryKey: ["getEvents", eventRegistryValue],
    queryFn: () => getEvents(tenant!.id, workspace!.id, eventRegistryValue),
    enabled: !!eventRegistryValue,
  });

  const { mutateAsync } = useMutation({
    mutationFn: ({
      tenantId,
      workspaceId,
      serviceId,
      formData,
    }: {
      tenantId: string;
      workspaceId: string;
      serviceId: string;
      formData: z.infer<typeof endpointRequestSchema>;
    }) => createEndpoint(tenantId, workspaceId, serviceId, formData),
  });

  function onSubmit(data: EndpointFormValues) {
    return toast.promise(
      mutateAsync({
        tenantId: tenant!.id,
        workspaceId: workspace!.id,
        serviceId: serviceId,
        formData: {
          ...data,
          serviceId: serviceId,
          isActive: true,
          method: 0,
          workspaceId: workspace!.id,
          tenantId: tenant!.id,
          source: "postman",
          headers: Object.fromEntries(
            data.headers
              .filter(
                (h): h is { key: string; value: string } => h !== undefined
              )
              .map((h) => [h.key, h.value])
          ),
        },
      }),
      {
        loading: "Creating Endpoint...",
        success: "Endpoint Created Successfully",
        error: "Failed to create Endpoint",
      }
    );
    return toast(
      <div>
        <pre>{JSON.stringify(data, null, 2)}</pre>
      </div>
    );
  }

  const [selectedEvents, setSelectedEvents] = useState<string[]>([]);
  useEffect(() => {
    // form.resetField("events");
    setSelectedEvents([]);
  }, [eventRegistryValue]);

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
          name="description"
          render={({ field }) => (
            <FormItem>
              <FormLabel>
                {" "}
                <Typography variant={"formFieldTitle"}>
                  Endpoint Description
                </Typography>
              </FormLabel>
              <FormControl>
                <Textarea
                  placeholder="Endpoint Description..."
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
        <FormField
          control={form.control}
          name="subject"
          render={({ field }) => (
            <FormItem>
              <FormLabel>
                {" "}
                <Typography variant={"formFieldTitle"}>
                  Endpoint Subject
                </Typography>
              </FormLabel>
              <FormControl>
                <Input placeholder="Endpoint subject..." {...field} />
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
          name="secret"
          render={({ field }) => (
            <FormItem>
              <FormLabel>
                {" "}
                <Typography variant={"formFieldTitle"}>
                  Endpoint Secret
                </Typography>
              </FormLabel>
              <FormControl>
                <PasswordInput placeholder="Endpoint secret..." {...field} />
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
                <TableRow key={field.id}>
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
                  <TableCell>
                    <Button
                      variant={"outline"}
                      size="icon"
                      onClick={() => remove(index)}
                    >
                      <Minus />
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
        <FormField
          control={form.control}
          name="eventRegistryId"
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
                  {isRegistryDataFetching ? (
                    <SelectItem disabled={true} value="null">
                      Fetching Registries...
                    </SelectItem>
                  ) : isRegistryDataSuccess && registryData?.data.length > 0 ? (
                    registryData.data.map((item: EventRegistryResource) => (
                      <SelectItem
                        key={item.id}
                        onClick={async () => {
                          field.onChange(item.id);
                        }}
                        value={item.id}
                      >
                        {item.name}
                      </SelectItem>
                    ))
                  ) : (
                    <SelectItem disabled={true} value="No registries found">
                      No registries found
                    </SelectItem>
                  )}
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
                disabled={!eventRegistryValue && !isEventsDataSuccess}
                options={(eventsData || []).map((e) => {
                  return { value: e, label: e };
                })}
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
