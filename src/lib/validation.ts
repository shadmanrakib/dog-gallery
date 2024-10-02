import { z } from "zod";

export const BreedListResponseSchema = z.union([
  z.object({
    message: z.record(
      z.union([
        z.array(z.string()), // Sub-breeds as an array of strings
        z.array(z.never()), // Empty array for breeds without sub-breeds
      ])
    ),
    status: z.literal("success"),
  }),
  z.object({ status: z.literal("error") }),
]);

export const ImageResponseSchema = z.union([
  z.object({
    message: z.array(z.string()),
    status: z.literal("success"),
  }),
  z.object({ status: z.literal("error") }),
]);
