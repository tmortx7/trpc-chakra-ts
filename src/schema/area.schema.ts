import { z } from "zod";

export const AreaSchema = z.object({
  alias: z.string().min(1),
  description: z.string(),
  siteId: z.string().uuid(),
});

export type IArea = z.infer<typeof AreaSchema>;
