import { UserJSON } from "@clerk/backend";
import { v } from "convex/values";
import { Doc, Id } from "./_generated/dataModel";
import { internalMutation, query, QueryCtx } from "./_generated/server";

type UserLoginStatus =
  | { message: "No JWT Token"; user: null }
  | { message: "No Clerk User"; user: null }
  | { message: "Logged In"; user: Doc<"users"> };

/**
 * Whether the current user is fully logged in, including having their information
 * synced from Clerk via webhook.
 *
 * Like all Convex queries, errors on expired Clerk token.
 */
export const userLoginStatus = query(async (ctx): Promise<UserLoginStatus> => {
  const identity = await ctx.auth.getUserIdentity();
  if (!identity) {
    // no JWT token, user hasn't completed login flow yet
    return { message: "No JWT Token", user: null };
  }
  const user = await getCurrentUser(ctx);
  if (user === null) {
    // If Clerk has not told us about this user we're still waiting for the
    // webhook notification.
    return { message: "No Clerk User", user: null };
  }
  return { message: "Logged In", user };
});

/** The current user, containing user preferences and Clerk user info. */
export const currentUser = query((ctx: QueryCtx) => getCurrentUser(ctx));

/** Get user by Clerk use id (AKA "subject" on auth)  */
export const getUser = query({
  args: { subject: v.string() },
  async handler(ctx, args) {
    return await userQuery(ctx, args.subject);
  },
});

/**
 * Helper to extract user fields from Clerk data.
 */
function extractUserFields(data: UserJSON) {
  const userEmailAddress =
    data.email_addresses.find(
      (email) => email.id === data.primary_email_address_id
    ) || data.email_addresses[0];

  if (!userEmailAddress) {
    throw new Error("No email address found for user");
  }

  return {
    clerkUserId: data.id,
    email: userEmailAddress.email_address,
    firstName: data.first_name ?? undefined,
    lastName: data.last_name ?? undefined,
    imageUrl: data.image_url,
    updatedAt: new Date(data.updated_at).getMilliseconds(),
    createdAt: new Date(data.created_at).getMilliseconds(),
  };
}

/** Create a new Clerk user. */
export const createUser = internalMutation({
  args: { data: v.any() }, // no runtime validation, trust Clerk
  async handler(ctx, { data }: { data: UserJSON }) {
    const userRecord = await userQuery(ctx, data.id);
    if (userRecord !== null) {
      throw new Error("User already exists");
    }

    const user = extractUserFields(data);
    const userId = await ctx.db.insert("users", user);
  },
});

/** Update an existing Clerk user. */
export const updateUser = internalMutation({
  args: { data: v.any() }, // no runtime validation, trust Clerk
  async handler(ctx, { data }: { data: UserJSON }) {
    const userRecord = await userQuery(ctx, data.id);
    if (userRecord === null) {
      throw new Error("User does not exist");
    }
    const user = extractUserFields(data);
    await ctx.db.patch(userRecord._id, { ...user });
  },
});

/** Delete a user by clerk user ID. */
export const deleteUser = internalMutation({
  args: { id: v.string() },
  async handler(ctx, { id }) {
    const userRecord = await userQuery(ctx, id);

    if (userRecord === null) {
      console.warn("can't delete user, does not exist", id);
    } else {
      await ctx.db.delete(userRecord._id);
    }
  },
});

// Helpers

export async function userQuery(ctx: QueryCtx, clerkUserId: string) {
  return await ctx.db
    .query("users")
    .withIndex("by_clerk_id", (q) => q.eq("clerkUserId", clerkUserId))
    .unique();
}

export async function userById(ctx: QueryCtx, id: Id<"users">) {
  return await ctx.db.get(id);
}

async function getCurrentUser(ctx: QueryCtx): Promise<Doc<"users"> | null> {
  const identity = await ctx.auth.getUserIdentity();
  if (identity === null) {
    return null;
  }
  return await userQuery(ctx, identity.subject);
}

export async function mustGetCurrentUser(ctx: QueryCtx): Promise<Doc<"users">> {
  const userRecord = await getCurrentUser(ctx);
  if (!userRecord) throw new Error("Can't get current user");
  return userRecord;
}
