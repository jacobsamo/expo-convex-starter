import { useUser } from '@clerk/clerk-expo';
import { useQuery, useMutation } from 'convex/react';
import { api } from '@/convex/_generated/api';
import { useEffect } from 'react';

export const useConvexUser = () => {
  const { user: clerkUser, isLoaded: clerkLoaded } = useUser();
  const createUser = useMutation(api.users.createUser);
  const convexUser = useQuery(
    api.users.getUser,
    clerkUser ? { clerkUserId: clerkUser.id } : 'skip'
  );

  useEffect(() => {
    if (clerkLoaded && clerkUser && !convexUser) {
      // Sync user to Convex if they don't exist
      createUser({
        clerkUserId: clerkUser.id,
        email: clerkUser.emailAddresses[0]?.emailAddress || '',
        firstName: clerkUser.firstName || undefined,
        lastName: clerkUser.lastName || undefined,
        imageUrl: clerkUser.imageUrl || undefined,
      }).catch(console.error);
    }
  }, [clerkLoaded, clerkUser, convexUser, createUser]);

  return {
    user: convexUser,
    isLoading: !clerkLoaded || (clerkUser && convexUser === undefined),
  };
};