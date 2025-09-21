# Clerk Authentication Setup Guide

This Expo React Native app is now configured with Clerk authentication and Convex integration, including OAuth support for Google and Microsoft. Follow these steps to complete the setup:

## Prerequisites

1. **Clerk Account**: Sign up at [clerk.com](https://clerk.com)
2. **Convex Account**: Sign up at [convex.dev](https://convex.dev)
3. **Google Cloud Console Account** (for Google OAuth)
4. **Microsoft Azure Account** (for Microsoft OAuth)

## Configuration Steps

### 1. Clerk Dashboard Setup

1. Create a new application in your Clerk Dashboard
2. Navigate to **Configure → Email, Phone, Username**
   - Enable **Email Address**
   - Select **Email verification code** as the verification method
3. Navigate to **Configure → Authentication strategies**
   - Enable **Password**
   - Enable **Email verification code**
4. Copy your **Publishable Key** from the API Keys section

### 2. OAuth Provider Setup

#### Google OAuth
1. In Clerk Dashboard, go to **Configure → Social connections**
2. Enable **Google**
3. You'll be prompted to add OAuth credentials:
   - Go to [Google Cloud Console](https://console.cloud.google.com/)
   - Create a new project or select existing
   - Enable Google+ API
   - Create OAuth 2.0 credentials
   - Add Clerk's redirect URI (provided in Clerk dashboard)
   - Copy Client ID and Client Secret to Clerk

#### Microsoft OAuth
1. In Clerk Dashboard, go to **Configure → Social connections**
2. Enable **Microsoft**
3. You'll be prompted to add OAuth credentials:
   - Go to [Azure Portal](https://portal.azure.com/)
   - Register a new application in Azure AD
   - Add Clerk's redirect URI (provided in Clerk dashboard)
   - Create a client secret
   - Copy Application (client) ID and Client Secret to Clerk

### 3. Convex Dashboard Setup

1. Create a new project in Convex
2. Copy your Convex deployment URL (looks like: `https://your-app.convex.cloud`)
3. Run `bunx convex dev` to initialize your Convex project

### 4. Configure Clerk-Convex Integration

1. In Clerk Dashboard, go to **Configure → JWT Templates**
2. Click **New Template** and select **Convex**
3. Copy the JWT issuer domain (it will look like: `https://your-app.clerk.accounts.dev`)

### 5. Environment Variables

Update the `.env` file with your actual keys:

```env
EXPO_PUBLIC_CLERK_PUBLISHABLE_KEY=pk_test_your_actual_key
EXPO_PUBLIC_CONVEX_URL=https://your-app.convex.cloud
```

In your Convex dashboard, add this environment variable:
```
CLERK_JWT_ISSUER_DOMAIN=https://your-app.clerk.accounts.dev
CLERK_WEBHOOK_SECRET=wh_test_...
```

## Features Implemented

### Authentication Pages
- **Sign In** (`/auth/sign-in`): Email/password and OAuth login (Google, Microsoft)
- **Sign Up** (`/auth/sign-up`): New user registration with email verification or OAuth
- **Verify** (`/auth/verify`): Email verification code entry

### Protected Routes
- **Profile Tab**: Shows user information and quick actions
- **Full Profile** (`/protected/profile`): Detailed user profile
- **Settings** (`/protected/settings`): User preferences and account settings

### Navigation
- Automatic redirect to sign-in for unauthenticated users
- Protected tab navigation that requires authentication
- Profile tab with sign-out functionality

### OAuth Integration
- Google Sign-In/Sign-Up
- Microsoft Sign-In/Sign-Up
- Automatic account linking for OAuth users
- Seamless authentication flow with WebBrowser

### Convex Integration
- User synchronization between Clerk and Convex
- Database schema for user management
- Queries and mutations for user operations

## Testing the Authentication Flow

1. Start the development server:
   ```bash
   bun start
   ```

2. Test Sign Up:
   - Navigate to the Sign Up screen
   - Option 1: Enter email and password (min 8 characters)
     - Check your email for verification code
     - Enter the code to complete registration
   - Option 2: Click "Sign up with Google" or "Sign up with Microsoft"
     - Complete OAuth flow in browser
     - Automatically redirected back to app

3. Test Sign In:
   - Option 1: Use registered email and password
   - Option 2: Click "Sign in with Google" or "Sign in with Microsoft"
   - You'll be redirected to the home screen upon success

4. Test Protected Routes:
   - Try accessing the tabs - they require authentication
   - Navigate to the Profile tab to see user information
   - Test the Sign Out button

## Customization

### Styling
- All components use the app's color scheme (light/dark mode support)
- Modify styles in individual component files
- Update `Colors.ts` for global color changes

### Adding More Protected Routes
1. Create new screens in `app/(protected)/`
2. They'll automatically require authentication
3. Add navigation links from the profile or settings screens

### Extending User Data
1. Update the Convex schema in `convex/schema.ts`
2. Modify the user mutations in `convex/users.ts`
3. Update the `useConvexUser` hook if needed

## Troubleshooting

1. **"Missing Clerk Publishable Key" Error**
   - Ensure `.env` file exists with the correct key
   - Restart the Metro bundler after adding environment variables

2. **Authentication Not Working**
   - Verify Clerk dashboard settings match the guide
   - Check that email verification is enabled
   - Ensure passwords meet the minimum requirements

3. **OAuth Not Working**
   - Ensure OAuth providers are enabled in Clerk Dashboard
   - Verify redirect URIs are correctly configured
   - Check that Client ID and Secret are properly set
   - For Expo Go: OAuth may not work in development, test with a build

4. **Convex Connection Issues**
   - Run `bunx convex dev` to ensure Convex is connected
   - Verify the Convex URL in `.env` is correct
   - Check that JWT template is configured in Clerk

## Security Notes

- Never commit `.env` file to version control
- Use `.env.example` as a template for team members
- Tokens are securely stored using `expo-secure-store`
- All sensitive operations happen server-side through Convex

## Next Steps

1. ✅ ~~Implement social login providers (Google, Microsoft)~~
2. Add Apple Sign-In for iOS
3. Add user profile editing functionality
4. Implement password reset flow
5. Add two-factor authentication
6. Create user onboarding flow using clerk components 
7. Implement account linking for users with multiple auth methods