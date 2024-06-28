import Link from "next/link";
import { ArrowUpRight } from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import PaginatedTable from "@/components/custom/paginatedTable";
import AddEventDialog from "./_components/addEventDialog";
import { Session } from "next-auth";
import { auth } from "@/auth";
import { QueryClient } from "@tanstack/react-query";
import { getEventRegistryById, getEvents } from "@/actions/eventRegistries";
import DeleteEventDialog from "./_components/deleteEventDialog";
import RegistryActions from "./_components/registryActions";
import Typography from "@/components/custom/typography";

const COLUMNS = [
  {
    name: "id",
    label: "ID",
  },
  {
    name: "name",
    label: "Name",
  },
  {
    name: "actions",
    label: "Actions",
    render: (item: any) => {
      return (
        <DeleteEventDialog
          eventRegistryId={item.eventRegistryId}
          eventName={item.name}
        />
      );
    },
  },
];

const RegistryPage = async ({ params }: any) => {
  const { registryId } = params;
  const session: Session = (await auth()) as Session;
  const queryClient = new QueryClient();

  const registryRes = await queryClient.fetchQuery({
    queryKey: ["getEventRegistry", registryId],
    queryFn: () =>
      getEventRegistryById(
        session!.user!.tenant,
        session!.user!.workspace,
        registryId
      ),
  });

  const eventsRes = await queryClient.fetchQuery({
    queryKey: ["getEvents"],
    queryFn: () =>
      getEvents(session!.user!.tenant, session!.user!.workspace, registryId),
  });

  return (
    <div className="flex flex-col  w-full">
      <div className="flex gap-4 md:gap-4   justify-between items-end ">
        <div className="flex flex-col w-full md:w-3/4">
          <Typography variant={"pageTitle"}>{registryRes.name}</Typography>
          <Typography variant={"pageDescription"} className="line-clamp-2 mt-1">
            {registryRes.description}{" "}
          </Typography>
        </div>

        <div className="flex flex-col gap-2 md:flex-row justify-end w-full">
          {/* <Badge className="self-start smd:self-auto">Active</Badge> */}
          <RegistryActions registry={registryRes} />
        </div>
      </div>
      <div>
        <div className="flex flex-row items-center mt-4">
          <div className="grid gap-2">
            <CardTitle>Events</CardTitle>
            <CardDescription>
              Configure or edit events for this event registry
            </CardDescription>
          </div>
        </div>
        <div className="w-full">
          <PaginatedTable
            tableFooter={
              <div className="w-full flex justify-end">
                {/* <Button className="bg-foreground" size="sm">
                  Add New Event+
                </Button> */}
                <AddEventDialog eventRegistryId={registryRes.id} />
              </div>
            }
            columns={COLUMNS}
            data={eventsRes.map((event, index) => {
              return {
                id: index + 1,
                name: event,
                eventRegistryId: registryId,
              };
            })}
          />
        </div>
      </div>
    </div>
  );
};

export default RegistryPage;
