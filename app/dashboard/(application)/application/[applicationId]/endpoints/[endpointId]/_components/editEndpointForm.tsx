"use client";

import Typography from "@/components/custom/typography";
import { MultiSelect } from "@/components/multiselect";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
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
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { zodResolver } from "@hookform/resolvers/zod";
import { Edit, Minus } from "lucide-react";
import { useState } from "react";
import { useFieldArray, useForm } from "react-hook-form";
import { z } from "zod";

const EXISTING_HEADERS = [
  {
    key: "Content-Type",
    value: "application/json",
  },
  {
    key: "Authorization",
    value: "Bearer 123",
  },
];

const EditEndpointForm = () => {
  const eventList = [
    { value: "sms_sent", label: "SMS_SENT" },
    { value: "sms_failed", label: "SMS_FAILED" },
    { value: "dummy_event", label: "DUMMY_EVENT" },
  ];

  const [disabledFields, setDisabledFields] = useState<{
    [key: string]: boolean;
  }>({
    name: true,
    url: true,
    headers: true,
    eventRegistry: true,
    events: true,
  });

  const [selectedEvents, setSelectedEvents] = useState<string[]>([]);

  const toggleDisabled = (field: string) => {
    setDisabledFields({
      ...disabledFields,
      [field]: !disabledFields[field],
    });
  };

  const editEndpointFormSchema = z.object({
    name: z.string().optional(),
    url: z.string().url().optional(),
    headers: z
      .array(
        z.object({
          key: z.string(),
          value: z.string(),
        })
      )
      .optional(),
    eventRegistry: z.string().optional(),
    events: z.array(z.string()).optional(),
  });

  const defaultValues: Partial<EditEndpointFormValues> = {
    headers: EXISTING_HEADERS,
  };

  type EditEndpointFormValues = z.infer<typeof editEndpointFormSchema>;

  const form = useForm<EditEndpointFormValues>({
    resolver: zodResolver(editEndpointFormSchema),
    mode: "onChange",
    defaultValues,
  });

  const { fields, append, remove } = useFieldArray({
    name: "headers",
    control: form.control,
  });

  function onSubmit(data: EditEndpointFormValues) {
    console.log("submitting", data);
  }

  return (
    <div>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className=" space-y-6">
          {/* <div className="grid grid-cols-3 md:grid-cols-6 grid-flow-row-dense"> */}
          {/* <div className="grid gap-3 font-semibold  col-span-1 items-start"> */}
          <Table className="border-none">
            <TableBody>
              <TableRow>
                <TableCell className="align-top">
                  <Typography variant="formFieldTitle">
                    Endpoint Name
                  </Typography>
                  {/* <span>Application ID</span> */}
                </TableCell>
                <TableCell>
                  <FormField
                    disabled={disabledFields.name}
                    control={form.control}
                    name="name"
                    render={({ field }) => (
                      <FormItem>
                        <FormControl>
                          <Input placeholder="Endpoint Name" {...field} />
                        </FormControl>
                        <FormDescription>
                          This is a sample description for this field
                          <Button onClick={() => toggleDisabled("name")}>
                            <Edit />
                          </Button>
                        </FormDescription>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell className="align-top">
                  <Typography variant="formFieldTitle">Endpoint Url</Typography>
                  {/* <span>Application ID</span> */}
                </TableCell>
                <TableCell>
                  <FormField
                    control={form.control}
                    name="url"
                    render={({ field }) => (
                      <FormItem>
                        <FormControl>
                          <Input placeholder="Endpoint Url" {...field} />
                        </FormControl>
                        <FormDescription>
                          This is a sample description for this field
                        </FormDescription>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell className="align-top">
                  <Typography variant="formFieldTitle">Headers</Typography>
                </TableCell>
                <TableCell>
                  <div>
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
                            <TableCell></TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                    <FormDescription>
                      This is a sample description for this field
                    </FormDescription>
                    <Button
                      type="button"
                      variant={"secondary"}
                      size="sm"
                      className="mt-2 col-span-4"
                      onClick={() => append({ key: "", value: "" })}
                    >
                      Add Header
                    </Button>
                  </div>
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell className="align-top">
                  <Typography variant="formFieldTitle">
                    Event Registry
                  </Typography>
                </TableCell>
                <TableCell>
                  <FormField
                    control={form.control}
                    name="eventRegistry"
                    render={({ field }) => (
                      <FormItem>
                        <Select onValueChange={field.onChange}>
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue placeholder="Select Event Registry" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            <SelectItem value="sms_registry">
                              SMS Registry
                            </SelectItem>

                            <SelectItem value="whatsapp_registry">
                              Whatsapp Registry
                            </SelectItem>
                          </SelectContent>
                        </Select>
                        <FormDescription>
                          This is a sample description for this field
                        </FormDescription>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell className="align-top">
                  <Typography variant="formFieldTitle">Events</Typography>
                </TableCell>
                <TableCell>
                  <FormField
                    control={form.control}
                    name="events"
                    render={({ field }) => (
                      <FormItem>
                        <MultiSelect
                          options={eventList}
                          onValueChange={(val) => {
                            field.onChange(val);
                            setSelectedEvents(val);
                          }}
                          defaultValue={selectedEvents}
                          placeholder="Select Events"
                          variant="secondary"
                          animation={2}
                          maxCount={3}
                        />
                        <FormDescription>
                          This is a sample description for this field
                        </FormDescription>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </TableCell>
              </TableRow>
            </TableBody>
          </Table>
          <Button className="self-end" size="lg" type="submit">
            Save
          </Button>
        </form>
      </Form>
    </div>
  );
};

export default EditEndpointForm;
