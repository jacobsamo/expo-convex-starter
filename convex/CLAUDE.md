# Convex + Clerk setup
- documentation: https://docs.convex.dev/
- extending convex with components: 
    - documentation: https://docs.convex.dev/components
    - components list: https://www.convex.dev/components


### Push Notifications
If you are doing a push notification related to data stored in convex follow this guide https://www.convex.dev/components/push-notifications, the base is already setup in the project the rest needs to be setup

### Zod
We are using the convex-helpers library to setup zod validation for convex this covers: table creation and querys/mutations validation, these zod schemas as located in @../src/zod-schemas/* there is a shared schemas file for shared items like default fields from convex and more to help with validation throughout the app.
