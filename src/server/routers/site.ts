import { inputAdornmentClasses } from "@mui/material";
import { Prisma } from "@prisma/client";
import { TRPCError } from "@trpc/server";
import { z } from "zod";
import { EditSiteSchema, SiteSchema } from "../../schema/site.schema";
import { prisma } from "../prisma";
import { t } from "../trpc";

const defaultSiteSelect = Prisma.validator<Prisma.SiteSelect>()({
  id: true,
  site: true,
  alias: true,
  role: true,
  description: true,
  createdAt: true,
  updatedAt: true,
});

export const siteRouter = t.router({
  list: t.procedure.query(() => {
    /**
     * For pagination you can have a look at this docs site
     * @link https://trpc.io/docs/useInfiniteQuery
     */

    return prisma.site.findMany({
      select: defaultSiteSelect,
    });
  }),
  byId: t.procedure
    .input(
      z.object({
        id: z.string(),
      })
    )
    .query(async ({ input }) => {
      const { id } = input;
      const site = await prisma.site.findUnique({
        where: { id },
        select: defaultSiteSelect,
      });
      if (!site) {
        throw new TRPCError({
          code: "NOT_FOUND",
          message: `No post with id '${id}'`,
        });
      }
      return site;
    }),
  add: t.procedure.input(SiteSchema).mutation(async ({ input }) => {
    const site = await prisma.site.create({
      data: {
          site: input.site.toLowerCase(),
          alias: input.alias.toLowerCase(),
          role: input.role,
          description: input.description.toLowerCase(),
        },
      select: defaultSiteSelect,
    });
    return site;
  }),
  edit: t.procedure
    .input(EditSiteSchema)
    .mutation(async ({ input }) => {
      return await prisma.site.update({
        where: {
          id: input.id,
        },
        data: {
          id: input.id,
          site: input.site.toLowerCase(),
          alias: input.alias.toLowerCase(),
          role: input.role,
          description: input.description.toLowerCase(),
        },
      });
    }),
  delete: t.procedure
    .input(
      z.object({
        id: z.string(),
      })
    )
    .mutation(async ({input})=> {
      return await prisma.site.delete({
        where: { id: input.id },
      });
    })
});
