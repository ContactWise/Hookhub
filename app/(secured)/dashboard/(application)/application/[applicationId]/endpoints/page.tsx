import PaginatedTable from "@/components/custom/paginatedTable";
import { Button } from "@/components/ui/button";
import AddEndpointSheet from "./_components/addEndpointSheet";
import Typography from "@/components/custom/typography";
import { ScrollArea } from "@/components/ui/scroll-area";
import Link from "next/link";
import {
  HydrationBoundary,
  QueryClient,
  dehydrate,
} from "@tanstack/react-query";
import { getEndpoints } from "@/actions/endpoints";
import { auth } from "@/auth";
import { Session } from "next-auth";
import EndpointsTable from "./_components/endpointsTable";

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

const queryClient = new QueryClient();

const EndpointsPage = async ({ params }: any) => {
  const { applicationId } = params;
  const session: Session = (await auth()) as Session;
  console.log("applicationId", applicationId);
  await queryClient.prefetchQuery({
    queryKey: ["getEndpoints"],
    queryFn: () =>
      getEndpoints(
        session!.user!.tenant,
        session!.user!.workspace,
        applicationId
      ),
  });
  // console.log("Res", res);
  return (
    <>
      <Typography variant={"pageTitle"}>Your Endpoints</Typography>
      <ScrollArea className="flex flex-1 p-2 justify-center rounded-lg border border-dashed shadow-sm h-1/2 ">
        <div className="flex justify-between mb-2 items-center">
          <Typography variant={"tableHeading"} className="text-lg">
            Endpoints
          </Typography>
          {/* <AddEndpointSheet /> */}
          <Link
            href={`/dashboard/application/${applicationId}/endpoints/create`}
          >
            <Button>Create New Endpoint +</Button>
          </Link>
        </div>
        <HydrationBoundary state={dehydrate(queryClient)}>
          <EndpointsTable serviceId={applicationId} />
        </HydrationBoundary>
        {/* <PaginatedTable
          paginated
          tableHead={TableHeader}
          columns={COLUMNS}
          data={DATA}
        /> */}
      </ScrollArea>
    </>
  );
};

export default EndpointsPage;
