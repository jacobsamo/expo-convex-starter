import { zid } from "convex-helpers/server/zod";
import * as z from "zod";
import { defaultFields, insertSchema } from "./shared-schemas";

export const userSchema = z.object({
  ...defaultFields,
  clerkUserId: z.string(),
  email: z.string(),
  firstName: z.string().optional(),
  lastName: z.string().optional(),
  imageUrl: z.string().optional(),
  createdAt: z.number(),
  updatedAt: z.number(),
});

export const usersEditSchema = insertSchema(userSchema);