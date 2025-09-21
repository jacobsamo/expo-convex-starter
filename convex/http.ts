import type { WebhookEvent } from "@clerk/backend";
import { httpRouter } from "convex/server";
import { Webhook } from "svix";
import { internal } from "./_generated/api";
import { httpAction } from "./_generated/server";

const handleClerkWebhook = httpAction(async (ctx, request) => {
  const event = await validateRequest(request);
  if (!event) {
    return new Response("Error occurred", {
      status: 400,
    });
  }

  switch (event.type) {
    case "user.created": {
      console.log("Creating user", event.data.id);
      await ctx.runMutation(internal.users.createUser, {
        data: event.data,
      });
      break;
    }
    case "user.updated": {
      console.log("Updating user", event.data.id);
      await ctx.runMutation(internal.users.updateUser, {
        data: event.data,
      });
      break;
    }
    case "user.deleted": {
      console.log("Deleting user", event.data.id);
      const id = event.data.id!;
      await ctx.runMutation(internal.users.deleteUser, { id });
      break;
    }
    default: {
      console.log("Ignored Clerk webhook event", event.type);
    }
  }

  return new Response(null, {
    status: 200,
  });
});

const http = httpRouter();
http.route({
  path: "/clerk-users-webhook",
  method: "POST",
  handler: handleClerkWebhook,
});

async function validateRequest(
  req: Request
): Promise<WebhookEvent | undefined> {
  const payloadString = await req.text();

  const svixHeaders = {
    "svix-id": req.headers.get("svix-id")!,
    "svix-timestamp": req.headers.get("svix-timestamp")!,
    "svix-signature": req.headers.get("svix-signature")!,
  };

  if (!process.env.CLERK_WEBHOOK_SECRET) {
    throw new Error("CLERK_WEBHOOK_SECRET not set");
  }

  const wh = new Webhook(process.env.CLERK_WEBHOOK_SECRET);
  let evt: Event | null = null;
  try {
    evt = wh.verify(payloadString, svixHeaders) as Event;
  } catch (err) {
    console.log("Error verifying webhook:", err);
    return;
  }

  return evt as unknown as WebhookEvent;
}

export default http;
