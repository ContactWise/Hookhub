import { z } from "zod";

const credentialsRequestSchema = z.object({
  name: z.string().min(3),
  description: z.string().min(10),
  expiresAt: z.string(),
});

export { credentialsRequestSchema };
