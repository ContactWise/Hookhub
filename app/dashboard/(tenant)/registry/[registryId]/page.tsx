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
    name: "description",
    label: "Description",
  },
];

const DATA = [
  {
    id: "1",
    name: "Event 1",
    description: "Event 1 Description",
  },
  {
    id: "2",
    name: "Event 2",
    description: "Event 2 Description",
  },
  {
    id: "3",
    name: "Event 3",
    description: "Event 3 Description",
  },
  {
    id: "4",
    name: "Event 4",
    description: "Event 4 Description",
  },
];

const RegistryPage = () => {
  return (
    <div className="flex flex-col  w-full">
      <div className="flex flex-col w-full md:w-3/4">
        <h1 className="text-lg font-semibold md:text-2xl">
          Event Registry Name
        </h1>
        <p className="line-clamp-2">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed
          tincidunt, nunc nec lacinia aliquam, est libero ultricies purus, Lorem
          ipsum dolor sit amet, consectetur adipiscing elit. Sed tincidunt, nunc
          nec lacinia aliquam, est libero ultricies purus,
        </p>
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
                <AddEventDialog />
              </div>
            }
            columns={COLUMNS}
            data={DATA}
          />
        </div>
      </div>
    </div>
  );
};

export default RegistryPage;
