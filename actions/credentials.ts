"use server";

import axios from "@/queries/axiosInstance";
import { credentialsRequestSchema } from "@/schemas/credentials";
import { z } from "zod";

const getCredentials = async (tenantId: string, workspaceId: string) => {
  try {
    const { data } = await axios.get(
      `/api/v1/${tenantId}/workspaces/${workspaceId}/credentials`
    );
    return data;
  } catch (error) {
    throw new Error("Error: Failed to fetch credentials.");
  }
};

const getCredentialById = async (
  tenantId: string,
  workspaceId: string,
  credentialId: string
) => {
  try {
    const { data } = await axios.get(
      `/api/v1/${tenantId}/workspaces/${workspaceId}/credentials/${credentialId}`
    );
    return data;
  } catch (error) {
    throw new Error("Error: Failed to fetch credential.");
  }
};

const createCredential = async (
  tenantId: string,
  workspaceId: string,
  credential: z.infer<typeof credentialsRequestSchema>
) => {
  const { name, description, expiresAt } =
    credentialsRequestSchema.parse(credential);
  try {
    const res = await axios.post(
      `/api/v1/${tenantId}/workspaces/${workspaceId}/credentials`,
      {
        name,
        description,
        expiresAt,
      }
    );
    return res.data;
  } catch (error) {
    throw new Error("Error: Failed to create credential.");
  }
};

const setActiveStatus = async (
  tenantId: string,
  workspaceId: string,
  credentialId: string,
  status: boolean
) => {
  const baseUrl = `/api/v1/${tenantId}/workspaces/${workspaceId}/credentials/${credentialId}`;
  const url = `${baseUrl}/${status ? "activate" : "deactivate"}`;
  try {
    const res = await axios.put(url);
    return res.data;
  } catch (error) {
    throw new Error("Error: Failed to update credential status.");
  }
};

const deleteCredential = async (
  tenantId: string,
  workspaceId: string,
  credentialId: string
) => {
  try {
    const res = await axios.delete(
      `/api/v1/${tenantId}/workspaces/${workspaceId}/credentials/${credentialId}`
    );
    return res.data;
  } catch (error) {
    throw new Error("Error: Failed to delete credential.");
  }
};

export {
  getCredentials,
  getCredentialById,
  createCredential,
  setActiveStatus,
  deleteCredential,
};
