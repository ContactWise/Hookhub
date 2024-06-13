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
import RegistryCard from "./_components/registryCard";
import Typography from "@/components/custom/typography";

interface Credentials {
  id: string;
  key: string;
  createAt: string;
  expiresAt: string;
}

const HEADERS = [
  {
    name: "id",
    label: "ID",
  },
  {
    name: "key",
    label: "Key",
    render: (item: any) => {
      return (
        <span className="flex items-center">
          {`****${item.key.slice(-4)}`}
          <CopyButton variant={"ghost"} value={item.key}>
            <Copy className="text-muted-foreground" size={16} />
          </CopyButton>
        </span>
      );
    },
  },
  {
    name: "createAt",
    label: "Create At",
  },
  {
    name: "expiresAt",
    label: "Expires At",
  },
  {
    name: "actions",
    label: "Actions",
    render: (item: any) => (
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button aria-haspopup="true" size="icon" variant="ghost">
            <MoreHorizontal className="h-4 w-4" />
            <span className="sr-only">Toggle menu</span>
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          <DropdownMenuLabel>Actions</DropdownMenuLabel>
          <DropdownMenuItem>Revoke</DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    ),
  },
];

const DATA = [
  {
    id: "1",
    key: "key des",
    createAt: "2021-09-01",
    expiresAt: "2021-09-01",
  },
  {
    id: "2",
    key: "123456789",
    createAt: "2021-09-01",
    expiresAt: "2021-09-01",
  },
  {
    id: "3",
    key: "123456789",
    createAt: "2021-09-01",
    expiresAt: "2021-09-01",
  },
  {
    id: "4",
    key: "123456789",
    createAt: "2021-09-01",
    expiresAt: "2021-09-01",
  },
];

const REGISTERIES_DATA = [
  {
    registryName: "SMS Registry",
    description: "Sample description for SMS Registry",
    evenCount: 10,
  },
  {
    registryName: "Whatsapp Registry",
    description:
      "Sample description for Whatsapp Registry for description for Whatsapp Registry",
    evenCount: 8,
  },
];

const CredentialsPage = () => {
  return (
    <div className="flex flex-col items-center w-full">
      <div className="flex flex-col gap-2 md:gap-0 md:flex-row w-full justify-between">
        <Typography variant={"pageTitle"}>Event Registries</Typography>
        <Button size={"default"}>Create New Registry +</Button>
      </div>
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 w-full mt-4">
        {REGISTERIES_DATA.map((item, index) => {
          return <RegistryCard registryCard={item} key={index} />;
        })}
      </div>
    </div>
  );
};

export default CredentialsPage;
