"use client";

import { getTenants, getWorkspaces } from "@/queries/getUserDetails";
import { Tenant, Workspace } from "@/types";
import { useQuery } from "@tanstack/react-query";
import React, {
  createContext,
  useContext,
  useState,
  ReactNode,
  Dispatch,
  SetStateAction,
} from "react";

interface EnvironmentContextProps {
  tenant: Tenant | null;
  workspace: Workspace | null;
  setTenant: Dispatch<SetStateAction<Tenant | null>>;
  setWorkspace: Dispatch<SetStateAction<Workspace | null>>;
}
const EnvironmentContext = createContext<EnvironmentContextProps | undefined>(
  undefined
);

export const EnvironmentProvider = ({ children }: { children: ReactNode }) => {
  const [tenant, setTenant] = useState<Tenant | null>(null);
  const [workspace, setWorkspace] = useState<Workspace | null>(null);
  return (
    <EnvironmentContext.Provider
      value={{ tenant, workspace, setTenant, setWorkspace }}
    >
      {children}
    </EnvironmentContext.Provider>
  );
};

export const useEnvironmentContext = () => {
  const context = useContext(EnvironmentContext);
  if (!context) {
    throw new Error(
      "useEnvironmentContext must be used within an EnvironmentProvider"
    );
  }
  return context;
};
