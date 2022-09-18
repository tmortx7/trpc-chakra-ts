import { Prisma } from "@prisma/client";
import { AreaSchema } from "../../schema/area.schema";
import { t } from "../trpc";
import { prisma } from "../prisma";
import { z } from "zod";
import { TRPCError } from "@trpc/server";

const defaultAreaSelect = Prisma.validator<Prisma.SiteSelect>()({
  id: true,
  alias: true,
  description: true,
  createdAt: true,
  updatedAt: true,
});
export const areaRouter = t.router({
  list: t.procedure.query(() => {
    return prisma.area.findMany({
      select: defaultAreaSelect,
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
      const area = await prisma.area.findUnique({
        where: { id },
        select: defaultAreaSelect,
      });
      if (!area) {
        throw new TRPCError({
          code: "NOT_FOUND",
          message: `No area with id '${id}'`,
        });
      }
      return area;
    }),
  add: t.procedure.input(AreaSchema).mutation(async ({ input }) => {
    const area = await prisma.area.create({
      data: input,
      select: defaultAreaSelect,
    });
    return area;
  }),
});
