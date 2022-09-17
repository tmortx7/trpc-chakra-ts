import { z } from "zod";

export const SiteSchema = z.object({
  site: z.string().min(1),
  alias: z.string().min(1),
  description: z.string(),
})

export const EditSiteSchema = z.object({
  id: z.string().uuid(),
  site: z.string().min(1),
  alias: z.string().min(1),
  description: z.string(),
})

export type ISite = z.infer<typeof SiteSchema>
export type IEditSite = z.infer<typeof EditSiteSchema>