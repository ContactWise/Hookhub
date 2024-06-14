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

const ApplicationPage = () => {
  const tableHeader = (
    <div className="flex justify-start">
      <Typography variant="tableHeading">Recent Messages</Typography>
    </div>
  );
  return (
    <>
      <div className="flex gap-4 md:gap-4 flex-col  justify-between items-start ">
        <div className="flex flex-col w-full md:w-3/4">
          <Typography variant={"pageTitle"}>Application Name</Typography>
          <Typography variant={"pageDescription"} className="line-clamp-2 mt-1">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed
            tincidunt, nunc nec lacinia aliquam, est libero ultricies purus,
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed
            tincidunt, nunc nec lacinia aliquam, est libero ultricies purus,
          </Typography>
        </div>

        <div className="flex flex-col gap-2 md:flex-row justify-between w-full">
          <Typography variant={"subTItle"}>
            Application Url:{" "}
            <span className="font-normal">https://dummyurl.com</span>
          </Typography>

          <Badge className="self-start smd:self-auto">Active</Badge>
        </div>
      </div>
      <ScrollArea className="flex flex-1 p-2 justify-center rounded-lg border border-dashed shadow-sm ">
        <PaginatedTable columns={COLUMNS} data={data} tableHead={tableHeader} />
      </ScrollArea>
    </>
  );
};

export default ApplicationPage;
