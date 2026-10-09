/**
 * db.js
 * Connects to MongoDB with Mongoose. The connection string comes from the MONGODB_URI
 * environment variable (see .env.example), never from code.
 *
 * The connection is cached on a module-level promise, so calling connectDB() many times
 * (for example on every request of a serverless function) opens only one connection.
 */
import mongoose from "mongoose";

mongoose.set("strictQuery", true);

/** @type {Promise<typeof mongoose> | null} */
let connecting = null;

/**
 * @param {string | undefined} uri MongoDB connection string (process.env.MONGODB_URI)
 * @param {import("mongoose").ConnectOptions} [options] Extra Mongoose options (tests pass a test dbName)
 * @returns {Promise<typeof mongoose>}
 * @throws {Error} when no URI is given or MongoDB cannot be reached
 */
export function connectDB(uri = process.env.MONGODB_URI, options = {}) {
  if (mongoose.connection.readyState === 1) return Promise.resolve(mongoose);
  if (!uri) return Promise.reject(new Error("MONGODB_URI is not set. Copy .env.example to .env and fill it in."));
  if (!connecting) {
    connecting = mongoose
      .connect(uri, { serverSelectionTimeoutMS: 8000, ...options })
      .catch((error) => {
        connecting = null; // allow a retry on the next call
        throw error;
      });
  }
  return connecting;
}

/** Closes the connection (used by tests and on shutdown). */
export async function disconnectDB() {
  connecting = null;
  await mongoose.disconnect();
}

/** @returns {"disconnected"|"connected"|"connecting"|"disconnecting"} */
export function dbState() {
  return ["disconnected", "connected", "connecting", "disconnecting"][mongoose.connection.readyState] || "disconnected";
}
