import { defineSchema, defineTable } from "convex/server";
import { zodToConvex } from "convex-helpers/server/zod";
import { userSchema } from "../src/zod-schemas/auth-schema";

export default defineSchema({
  users: defineTable(zodToConvex(userSchema))
    .index("by_clerk_id", ["clerkUserId"])
    .index("by_email", ["email"]),
});