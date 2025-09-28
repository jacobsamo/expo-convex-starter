import { Redirect, Stack } from 'expo-router';
import { useAuth } from '@clerk/clerk-expo';

export default function AuthRoutesLayout() {
  const { isSignedIn } = useAuth();

  if (isSignedIn) {
    return <Redirect href={'/(tabs)'} />;
  }

  return (
    <Stack>
      <Stack.Screen
        name="sign-in"
        options={{
          title: 'Sign In',
          headerShown: true,
        }}
      />
      <Stack.Screen
        name="sign-up"
        options={{
          title: 'Sign Up',
          headerShown: true,
        }}
      />
      <Stack.Screen
        name="verify"
        options={{
          title: 'Verify Email',
          headerShown: true,
        }}
      />
    </Stack>
  );
}