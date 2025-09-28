import { api } from "@convex/_generated/api";
import { useUser } from "@clerk/clerk-expo";
import { useQuery } from "convex/react";

export const useConvexUser = () => {
  const { user: clerkUser, isLoaded: clerkLoaded } = useUser();
  const convexUser = useQuery(
    api.users.getUser,
    clerkUser ? { clerkUserId: clerkUser.id } : "skip"
  );

  return {
    user: convexUser,
    isLoading: !clerkLoaded || (clerkUser && convexUser === undefined),
  };
};
