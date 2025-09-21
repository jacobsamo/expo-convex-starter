import migrations from "@convex-dev/migrations/convex.config";
import { defineApp } from "convex/server";

const app = defineApp();

// Uncomment if you want to use the migrations
// app.use(migrations);


export default app;
