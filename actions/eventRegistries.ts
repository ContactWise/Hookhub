"use server";

import axios from "@/queries/axiosInstance";
import {
  createEventRequestSchema,
  eventRegistryRequestSchema,
} from "@/schemas/eventRegistry";
import { ApiResponse, EventRegistryResource } from "@/types";
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
): Promise<EventRegistryResource> => {
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

const getEvents = async (
  tenantId: string,
  workspaceId: string,
  eventRegistryId: string
): Promise<string[]> => {
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
    console.log(
      "url",
      `/api/v1/${tenantId}/workspaces/${workspaceId}/eventregistries/${eventRegistryId}/events`
    );
    const res = await axios.put(
      `/api/v1/${tenantId}/workspaces/${workspaceId}/eventregistries/${eventRegistryId}/events`,
      {
        name,
      }
    );
    if (res.data.result === false) {
      throw new Error("Error: Server indicated failure in creating event.");
    }
  } catch (error) {
    console.log({ error });
    throw new Error("Error: Failed to create event.");
  }
};

const deleteEvent = async (
  tenantId: string,
  workspaceId: string,
  eventRegistryId: string,
  eventName: string
) => {
  try {
    console.log(
      "url",
      `/api/v1/${tenantId}/workspaces/${workspaceId}/eventregistries/${eventRegistryId}/events`
    );
    console.log({ eventName });
    const res = await axios.put(
      `/api/v1/${tenantId}/workspaces/${workspaceId}/eventregistries/${eventRegistryId}/events`,
      { name: eventName }
    );
    if (res.data.result === false) {
      throw new Error("Error: Server indicated failure in deleting event.");
    }

    return res.data;
  } catch (error) {
    console.log({ error });
    throw new Error("Error: Failed to delete event.");
  }
};

export {
  getEventRegistries,
  createEventRegistry,
  getEventRegistryById,
  updateEventRegistry,
  deleteEventRegistry,
  getEvents,
  createEvent,
  deleteEvent,
};
