import { Prisma } from "@prisma/client";
import { TRPCError } from "@trpc/server";
import { z } from "zod";
import { SiteSchema } from "../../schema/site.schema";
import { prisma } from "../prisma";
import { t } from "../trpc";

const defaultSiteSelect = Prisma.validator<Prisma.SiteSelect>()({
  id: true,
  site: true,
  alias: true,
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
  add: t.procedure
    .input(SiteSchema)
    .mutation(async ({ input }) => {
      const site = await prisma.site.create({
        data: input,
        select: defaultSiteSelect,
      });
      return site;
    }),
});
