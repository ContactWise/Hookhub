"use client";

import { getTenantById } from "@/actions/tenants";
import { getWorkspaceById } from "@/actions/workspaces";
import { getTenants, getWorkspaces } from "@/queries/getUserDetails";
import { Tenant, Workspace } from "@/types";
import { useQuery } from "@tanstack/react-query";
import { useSession } from "next-auth/react";
import React, {
  createContext,
  useContext,
  useState,
  ReactNode,
  Dispatch,
  SetStateAction,
  useEffect,
  use,
} from "react";

interface EnvironmentContextProps {
  tenant: Tenant | null;
  workspace: Workspace | null;
  setTenant: (tenant: Tenant) => void;
  setWorkspace: (workspace: Workspace) => void;
}
const EnvironmentContext = createContext<EnvironmentContextProps | undefined>(
  undefined
);

export const EnvironmentProvider = ({ children }: { children: ReactNode }) => {
  const [tenant, setTenantState] = useState<Tenant | null>(null);
  const [workspace, setWorkspaceState] = useState<Workspace | null>(null);
  const { data: session, update } = useSession();

  const setTenant = async (value: Tenant) => {
    setTenantState(value);
    if (session) {
      await update({ ...session!.user, tenant: value.id });
    }
  };

  const setWorkspace = async (value: Workspace) => {
    setWorkspaceState(value);
    if (session) {
      console.log("session", session);
      await update({ ...session!.user, workspace: value.id });
    }
  };

  const {
    data: workspacesData,
    isFetched: isWorkspacesFetched,
    error: workspacesDataError,
    isLoading: isWorkspacesLoading,
    isSuccess: workspacesQuerySuccess,
  } = useQuery({
    queryKey: ["getWorkspaceById"],
    queryFn: () =>
      getWorkspaceById(session!.user!.tenant, session!.user?.workspace!),
    enabled: !!tenant,
  });

  const {
    data: tenantData,
    isFetched: isTenantFetched,
    error: tenantDataError,
    isLoading: isTenantLoading,
    isSuccess: tenantQuerySuccess,
  } = useQuery({
    queryKey: ["getTenantById"],
    queryFn: () => getTenantById(session!.user!.tenant),
  });

  useEffect(() => {
    if (tenantQuerySuccess) {
      console.log("setting tenant", tenantData);
      setTenant(tenantData);
    }
  }, [tenantQuerySuccess]);
  useEffect(() => {
    if (workspacesQuerySuccess) {
      console.log("setting workspace", workspacesData);
      setWorkspace(workspacesData);
    }
  }, [workspacesQuerySuccess]);

  // useEffect(() => {
  //   const fetchTenants = async () => {
  //     const tenants = await getTenants();
  //     if (tenants.data.length > 0) {
  //       setTenant(tenants.data[0]);
  //     }
  //   };
  //   fetchTenants();
  // }, []);

  // useEffect(() => {
  //   const fetchWorkspaces = async () => {
  //     if (tenant) {
  //       const workspaces = await getWorkspaces(tenant.id);
  //       if (workspaces.data.length > 0) {
  //         setWorkspace(workspaces.data[0]);
  //       }
  //     }
  //   };
  //   fetchWorkspaces();
  // }, [tenant]);

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
