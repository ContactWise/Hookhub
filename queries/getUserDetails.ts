"use client";
import axios from "./axiosInstance";

const getTenants = async () => {
  const { data } = await axios.get("/api/v1/tenants/list");
  return data;
};

const getWorkspaces = async (tenantId: string) => {
  const { data } = await axios.get(`/api/v1/${tenantId}/workspaces/list`);
  console.log("workspace fetched", tenantId);
  return data;
};

export { getTenants, getWorkspaces };
