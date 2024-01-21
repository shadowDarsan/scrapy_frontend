import { z } from "zod";

import { createTRPCRouter, protectedProcedure } from "@/server/api/trpc";
import { scrapper_history } from "@/server/db/schema";

export const scrapperRouter = createTRPCRouter({
  create: protectedProcedure
    .input(
      z.object({
        email: z.string().min(1),
        phone: z.string().min(1),
        facebook: z.string().min(1),
        instagram: z.string().min(1),
        twitter: z.string().min(1),
        pinterest: z.string().min(1),
        linkedin: z.string().min(1),
        website: z.string().min(1),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      await ctx.db.insert(scrapper_history).values({
        email: input.email,
        phone: input.phone,
        facebook: input.facebook,
        instagram: input.instagram,
        twitter: input.twitter,
        linkedin: input.linkedin,
        pinterest: input.pinterest,
        website: input.website,
      });
    }),

  getHistory: protectedProcedure.query(({ ctx }) => {
    return ctx.db.query.scrapper_history.findMany({
      orderBy: (scrapper, { desc }) => [desc(scrapper.createdAt)],
    });
  }),
});
