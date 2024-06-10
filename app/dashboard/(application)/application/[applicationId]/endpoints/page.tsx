import PaginatedTable from "@/components/custom/paginatedTable";
import { Button } from "@/components/ui/button";
import AddEndpointSheet from "./_components/addEndpointSheet";

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
    name: "url",
    label: "Url",
  },
  {
    name: "events",
    label: "Events",
  },
  {
    name: "actions",
    label: "Actions",
  },
];

const DATA = [
  {
    id: "1",
    name: "Event 1",
    url: "https://example.com",
    events: ["SMS_SENT", "EMAIL_SENT"],
  },
  {
    id: "2",
    name: "Event 2",
    url: "https://example.com",
    events: ["SMS_SENT", "EMAIL_SENT"],
  },
  {
    id: "3",
    name: "Event 3",
    url: "https://example.com",
    events: ["SMS_SENT", "EMAIL_SENT"],
  },
  {
    id: "4",
    name: "Event 4",
    url: "https://example.com",
    events: ["SMS_SENT", "EMAIL_SENT"],
  },
  {
    id: "5",
    name: "Event 5",
    url: "https://example.com",
    events: ["SMS_SENT", "EMAIL_SENT"],
  },
];

const EndpointsPage = () => {
  const TableHeader = (
    <div className="flex justify-between">
      <h2 className="text-lg font-semibold">Endpoints</h2>
      <AddEndpointSheet />
    </div>
  );

  return (
    <PaginatedTable
      paginated
      tableHead={TableHeader}
      columns={COLUMNS}
      data={DATA}
    />
  );
};

export default EndpointsPage;
