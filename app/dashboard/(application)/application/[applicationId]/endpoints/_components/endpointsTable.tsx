"use client";

import { getEndpoints } from "@/actions/endpoints";
import LoadingDots from "@/components/custom/loadingDots";
import PaginatedTable from "@/components/custom/paginatedTable";
import Typography from "@/components/custom/typography";
import { Button } from "@/components/ui/button";
import { useEnvironmentContext } from "@/context/envContext";
import { keepPreviousData, useQuery } from "@tanstack/react-query";
import Link from "next/link";

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

const EndpointsTable = ({ serviceId }: { serviceId: string }) => {
  const { tenant, workspace } = useEnvironmentContext();

  const { isLoading, isError, error, data, isFetched, isPlaceholderData } =
    useQuery({
      queryKey: ["getEndpoints"],
      queryFn: () => getEndpoints(tenant!.id, workspace!.id, serviceId),
      placeholderData: keepPreviousData,
    });

  if (isFetched) {
    console.log(data!.data);
  }

  const TableHeader = (
    <div className="flex justify-between items-center">
      <Typography variant={"tableHeading"} className="text-lg">
        Endpoints
      </Typography>
      {/* <AddEndpointSheet /> */}
      <Link href={`/dashboard/application/${serviceId}/endpoints/create`}>
        <Button>Create New Endpoint +</Button>
      </Link>
    </div>
  );

  return (
    <>
      {isLoading || !isFetched ? (
        <div className="w-full flex-1 flex flex-col justify-center items-center">
          <LoadingDots />
          {/* <Typography variant={"pageDescription"}>Loading...</Typography> */}
        </div>
      ) : isFetched && data!.data.length > 0 ? (
        <PaginatedTable
          paginated
          tableHead={TableHeader}
          columns={COLUMNS}
          data={data!.data}
        />
      ) : (
        <div>
          <Typography variant="subTItle">No services created</Typography>
          <Typography variant="pageDescription">
            Start by creating a new service
          </Typography>
        </div>
      )}
    </>
  );
};

export default EndpointsTable;
