"use server";

import axios from "@/queries/axiosInstance";
import { workspaceRequestSchema } from "@/schemas/workspace";
import { z } from "zod";

const getWorkspaces = async (tenantId: string) => {
  try {
    const { data } = await axios.get(`/api/v1/${tenantId}/workspaces/list`);
    return data;
  } catch (error) {
    throw new Error("Error: Failed to fetch workspaces.");
  }
};

const getWorkspaceById = async (tenantId: string, workspaceId: string) => {
  try {
    const { data } = await axios.get(
      `/api/v1/${tenantId}/workspaces/${workspaceId}`
    );
    return data;
  } catch (error) {
    throw new Error("Error: Failed to fetch workspace.");
  }
};

const createWorkspace = async (
  tenantId: string,
  formData: z.infer<typeof workspaceRequestSchema>
) => {
  const { name, description } = workspaceRequestSchema.parse(formData);
  try {
    const res = await axios.post(`/api/v1/${tenantId}/workspaces`, {
      name,
      description,
    });
    return res.data;
  } catch (error) {
    throw new Error("Error: Failed to create workspace.");
  }
};

const updateWorkspace = async (
  tenantId: string,
  workspaceId: string,
  formData: z.infer<typeof workspaceRequestSchema>
) => {
  const { name, description } = workspaceRequestSchema.parse(formData);
  try {
    const res = await axios.put(
      `/api/v1/${tenantId}/workspaces/${workspaceId}`,
      {
        name,
        description,
      }
    );
    return res.data;
  } catch (error) {
    throw new Error("Error: Failed to update workspace.");
  }
};

const setActiveStatus = async (
  tenantId: string,
  workspaceId: string,
  status: boolean
) => {
  const baseUrl = `/api/v1/${tenantId}/workspaces/${workspaceId}`;
  const url = `${baseUrl}/${status ? "activate" : "deactivate"}`;
  try {
    const res = await axios.put(url);
    return res.data;
  } catch (error) {
    throw new Error("Error: Failed to update workspace status.");
  }
};

const deleteWorkspace = async (tenantId: string, workspaceId: string) => {
  try {
    const res = await axios.delete(
      `/api/v1/${tenantId}/workspaces/${workspaceId}`
    );
    return res.data;
  } catch (error) {
    throw new Error("Error: Failed to delete workspace.");
  }
};

export {
  getWorkspaces,
  getWorkspaceById,
  createWorkspace,
  updateWorkspace,
  setActiveStatus,
  deleteWorkspace,
};
