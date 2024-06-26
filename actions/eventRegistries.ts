"use server";

import axios from "@/queries/axiosInstance";
import {
  createEventRequestSchema,
  eventRegistryRequestSchema,
} from "@/schemas/eventRegistry";
import { z } from "zod";

const getEventRegistries = async (tenantId: string, workspaceId: string) => {
  try {
    const { data } = await axios.get(
      `/api/v1/${tenantId}/workspaces/${workspaceId}/eventregistries/list`
    );
    return data;
  } catch (error) {
    throw new Error("Error: Failed to fetch event registries.");
  }
};

const createEventRegistry = async (
  tenantId: string,
  workspaceId: string,
  formData: z.infer<typeof eventRegistryRequestSchema>
) => {
  const { name, description } = eventRegistryRequestSchema.parse(formData);
  try {
    const res = await axios.post(
      `/api/v1/${tenantId}/workspaces/${workspaceId}/eventregistries`,
      {
        name,
        description,
      }
    );
    return res.data;
  } catch (error) {
    throw new Error("Error: Failed to create event registry.");
  }
};

const getEventRegistryById = async (
  tenantId: string,
  workspaceId: string,
  eventRegistryId: string
) => {
  try {
    const { data } = await axios.get(
      `/api/v1/${tenantId}/workspaces/${workspaceId}/eventregistries/${eventRegistryId}`
    );
    return data;
  } catch (error) {
    throw new Error("Error: Failed to fetch event registry.");
  }
};

const updateEventRegistry = async (
  tenantId: string,
  workspaceId: string,
  eventRegistryId: string,
  formData: z.infer<typeof eventRegistryRequestSchema>
) => {
  const { name, description } = eventRegistryRequestSchema.parse(formData);
  try {
    const res = await axios.put(
      `/api/v1/${tenantId}/workspaces/${workspaceId}/eventregistries/${eventRegistryId}`,
      {
        name,
        description,
      }
    );
    return res.data;
  } catch (error) {
    throw new Error("Error: Failed to update event registry.");
  }
};

const deleteEventRegistry = async (
  tenantId: string,
  workspaceId: string,
  eventRegistryId: string
) => {
  try {
    const res = await axios.delete(
      `/api/v1/${tenantId}/workspaces/${workspaceId}/eventregistries/${eventRegistryId}`
    );
    return res.data;
  } catch (error) {
    throw new Error("Error: Failed to delete event registry.");
  }
};

const listEvents = async (
  tenantId: string,
  workspaceId: string,
  eventRegistryId: string
) => {
  try {
    const { data } = await axios.get(
      `/api/v1/${tenantId}/workspaces/${workspaceId}/eventregistries/${eventRegistryId}/events`
    );
    return data;
  } catch (error) {
    throw new Error("Error: Failed to fetch events.");
  }
};

const createEvent = async (
  tenantId: string,
  workspaceId: string,
  eventRegistryId: string,
  formData: z.infer<typeof createEventRequestSchema>
) => {
  const { name } = createEventRequestSchema.parse(formData);
  try {
    const res = await axios.put(
      `/api/v1/${tenantId}/workspaces/${workspaceId}/eventregistries/${eventRegistryId}/events`,
      {
        name,
      }
    );
    return res.data;
  } catch (error) {
    throw new Error("Error: Failed to create event.");
  }
};

const deleteEvent = async (
  tenantId: string,
  workspaceId: string,
  eventRegistryId: string,
  eventId: string
) => {
  try {
    const res = await axios.put(
      `/api/v1/${tenantId}/workspaces/${workspaceId}/eventregistries/${eventRegistryId}/events/${eventId}`
    );
    return res.data;
  } catch (error) {
    throw new Error("Error: Failed to delete event.");
  }
};

export { getEventRegistries };
