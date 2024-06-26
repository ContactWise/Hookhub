import { z } from "zod";

const workspaceRequestSchema = z.object({
  name: z.string().min(3),
  description: z.string().min(10),
});

export { workspaceRequestSchema };
