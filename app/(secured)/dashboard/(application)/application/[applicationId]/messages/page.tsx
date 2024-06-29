import PaginatedTable from "@/components/custom/paginatedTable";
import Typography from "@/components/custom/typography";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { ChevronRight } from "lucide-react";
import Link from "next/link";

const COLUMNS = [
  {
    name: "id",
    label: "ID",
  },
  {
    name: "messageId",
    label: "Message ID",
  },
  {
    name: "applicationId",
    label: "Application ID",
  },
  {
    name: "status",
    label: "Status",
    render: (item: any) => {
      return item.status === "success" ? (
        <Badge variant="success">Success</Badge>
      ) : (
        <Badge variant="destructive">Error</Badge>
      );
    },
  },
  {
    name: "actions",
    label: "Actions",
    render: (item: any) => {
      return (
        <div className="flex gap-2">
          <Link
            className="rounded-full bg-secondary p-1"
            href={`/dashboard/application/141/messages/${item.messageId}`}
          >
            <ChevronRight />
          </Link>
        </div>
      );
    },
  },
];

const data = [
  {
    id: "1",
    messageId: "5512",
    applicationId: "1",
    status: "success",
  },
  {
    id: "2",
    messageId: "5513",
    applicationId: "1",
    status: "error",
  },
  {
    id: "3",
    messageId: "5514",
    applicationId: "1",
    status: "success",
  },
  {
    id: "4",
    messageId: "5515",
    applicationId: "1",
    status: "error",
  },
  {
    id: "5",
    messageId: "5516",
    applicationId: "1",
    status: "success",
  },
  {
    id: "6",
    messageId: "5517",
    applicationId: "1",
    status: "error",
  },
  {
    id: "7",
    messageId: "5518",
    applicationId: "1",
    status: "success",
  },
  {
    id: "8",
    messageId: "5519",
    applicationId: "1",
    status: "error",
  },
  {
    id: "9",
    messageId: "5520",
    applicationId: "1",
    status: "success",
  },
  {
    id: "10",
    messageId: "5521",
    applicationId: "1",
    status: "error",
  },
];

const MessagesPage = () => {
  return (
    <>
      <Typography variant={"pageTitle"}>Messages</Typography>

      <ScrollArea className="flex flex-1 p-2 justify-center rounded-lg border border-dashed shadow-sm ">
        <PaginatedTable
          columns={COLUMNS}
          data={data}
          tableHead={
            <div className="w-full flex justify-between items-center">
              <Typography variant={"tableHeading"}>Messages</Typography>
              <Button size={"sm"}>Filters</Button>
            </div>
          }
        />
      </ScrollArea>
    </>
  );
};

export default MessagesPage;
