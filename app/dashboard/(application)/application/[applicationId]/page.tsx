import PaginatedTable from "@/components/custom/paginatedTable";
import { Badge } from "@/components/ui/badge";

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
      <h1 className="text-2xl font-bold">Messages</h1>
    </div>
  );
  return (
    <div className="w-full">
      <PaginatedTable columns={COLUMNS} data={data} tableHead={tableHeader} />
    </div>
  );
};

export default ApplicationPage;
