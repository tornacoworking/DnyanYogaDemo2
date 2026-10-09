/**
 * index.js
 * Starts the backend: loads .env, connects to MongoDB, then listens on PORT.
 * Run with `npm run server` (or `npm run server:dev` to restart on file changes).
 *
 * Environment variables (see .env.example): MONGODB_URI, PORT, ADMIN_API_KEY, TRUST_PROXY.
 */
import "dotenv/config";
import { connectDB, disconnectDB } from "./config/db.js";
import { createApp } from "./app.js";

const port = Number(process.env.PORT) || 5000;

try {
  await connectDB();
  console.log("✔ Connected to MongoDB");
} catch (error) {
  console.error(`✖ Could not connect to MongoDB: ${error.message}`);
  console.error("  Check MONGODB_URI in your .env file and that MongoDB is running.");
  process.exit(1);
}

const server = createApp().listen(port, () => {
  console.log(`✔ DnyanYoga server running at http://localhost:${port}`);
});

// Close cleanly on Ctrl+C / hosting restarts.
for (const signal of ["SIGINT", "SIGTERM"]) {
  process.on(signal, () => {
    server.close(async () => {
      await disconnectDB();
      process.exit(0);
    });
  });
}
