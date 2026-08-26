import { cert, initializeApp } from "firebase-admin";
import dotenv from "dotenv";
import { readFileSync } from "fs";
import path from "path";
import { fileURLToPath } from "url";

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

let serviceAccount = null;

if (process.env.FIREBASE_SERVICE_ACCOUNT) {
  try {
    serviceAccount = JSON.parse(process.env.FIREBASE_SERVICE_ACCOUNT);
  } catch (error) {
    console.warn(
      "Firebase service account env var is invalid; falling back to file.",
      error.message,
    );
  }
}

if (!serviceAccount) {
  const serviceAccountPath = path.resolve(
    __dirname,
    "../serviceAccountKey.json",
  );
  try {
    serviceAccount = JSON.parse(readFileSync(serviceAccountPath, "utf8"));
  } catch (error) {
    console.warn(
      "Firebase service account file not found or invalid; Firebase auth will be unavailable.",
      error.message,
    );
  }
}

export let app = null;

if (serviceAccount) {
  app = initializeApp({
    credential: cert(serviceAccount),
  });
} else {
  console.warn("Firebase auth is not configured on this server.");
}
