import PaginatedTable from "@/components/custom/paginatedTable";
import InputForm from "@/components/formInput";
import { Copy, KeyRound } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { MoreHorizontal } from "lucide-react";
import { Button } from "@/components/ui/button";
import { z } from "zod";
import CopyButton from "@/components/custom/copyButton";
import Typography from "@/components/custom/typography";
import CreateKeyDialog from "./_components/createKeyDialog";
import { useEnvironmentContext } from "@/context/envContext";
import { QueryClient, useQuery } from "@tanstack/react-query";
import { getCredentials } from "@/actions/credentials";
import { Session } from "next-auth";
import { auth } from "@/auth";
import { CredentialResource } from "@/types";
import CredentialActions from "./_components/credentialsActions";

const HEADERS = [
  {
    name: "id",
    label: "ID",
  },
  {
    name: "name",
    label: "Name",
  },
  {
    name: "apiKey",
    label: "API Key",
    render: (item: any) => {
      return (
        <span className="flex items-center">
          {`****${item.apiKey.slice(-4)}`}
          <CopyButton variant={"ghost"} value={item.apiKey}>
            <Copy className="text-muted-foreground" size={16} />
          </CopyButton>
        </span>
      );
    },
  },
  {
    name: "createdAt",
    label: "Created At",
    render: (item: any) => (
      <span>{new Date(item.createdAt).toLocaleDateString()}</span>
    ),
  },
  // {
  //   name: "expiresAt",
  //   label: "Expires At",
  // },
  {
    name: "actions",
    label: "Actions",
    render: (item: any) => <CredentialActions credential={item} />,
  },
];

const CredentialsPage = async () => {
  const session: Session = (await auth()) as Session;
  const queryClient = new QueryClient();

  const res = await queryClient.fetchQuery({
    queryKey: ["getService"],
    queryFn: () =>
      getCredentials(session!.user!.tenant, session!.user!.workspace),
  });

  console.log("resforcreds", res);

  return (
    <div className="flex flex-col items-center w-full">
      <Typography className="self-start" variant="pageTitle">
        Credentials
      </Typography>
      <div className="flex  w-full mt-4">
        <CreateKeyDialog />
      </div>
      <PaginatedTable
        tableHead={
          <div className="flex gap-4">
            <Typography variant={"tableHeading"}>Credentials</Typography>
          </div>
        }
        className="mt-8"
        columns={HEADERS}
        data={res.data}
      />
    </div>
  );
};

export default CredentialsPage;
