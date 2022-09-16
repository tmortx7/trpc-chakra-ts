import { z } from "zod";

export const SiteSchema = z.object({
  site: z.string().min(1),
  alias: z.string().min(1),
  description: z.string(),
})

export type ISite = z.infer<typeof SiteSchema>