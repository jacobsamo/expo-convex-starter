import { PushNotifications } from "@convex-dev/expo-push-notifications";

export const pushNotifications = new PushNotifications(components.pushNotifications);


export function withoutSystemFields<
  T extends { _creationTime: number; _id: Id<any> },
>(doc: T) {
  const { _id, _creationTime, ...rest } = doc;
  return rest;
}



async function getUser(ctx: MutationCtx | QueryCtx) {
  const identity = await ctx.auth.getUserIdentity();
  console.log("IDENTITY", identity);
  if (!identity) return null;

  const user = await ctx.db
    .query("users")
    .withIndex("by_clerk_id", (q) => q.eq("clerkUserId", identity.subject as any))
    .unique();
  if (!user) return null;

  return user;
}

export const authedMutation = zCustomMutation(mutation, {
  args: {},
  input: async (ctx, args) => {
    const user = await getUser(ctx);
    console.log("USER", user);
    if (!user) throw new Error("Unauthorized");

    return {
      ctx: {
        ...ctx,
        user,
      },
      args,
    };
  },
});

export const authedQuery = zCustomQuery(query, {
  args: {},
  input: async (ctx, args) => {
    const user = await getUser(ctx);
    console.log("USER", user);
    if (!user) throw new Error("Unauthorized");

    return { ctx: { ...ctx, user }, args };
  },
});

export const zodQuery = zCustomQuery(query, NoOp);
export const zodMutation = zCustomMutation(mutation, NoOp);
export const zodInternalMutation = zCustomMutation(internalMutation, NoOp);
