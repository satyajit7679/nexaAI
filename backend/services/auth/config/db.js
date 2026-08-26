import dns from "node:dns";
import mongoose from "mongoose";
import User from "../models/user.model.js";

const dnsServers = (process.env.MONGODB_DNS_SERVERS || "1.1.1.1,8.8.8.8")
  .split(",")
  .map((server) => server.trim())
  .filter(Boolean);

dns.setServers(dnsServers);

const connectDb = async () => {
  const candidates = [
    process.env.MONGODB_URI,
    process.env.MONGODB_FALLBACK_URI || "mongodb://127.0.0.1:27017/auth",
  ].filter(Boolean);

  for (const uri of [...new Set(candidates)]) {
    try {
      await mongoose.connect(uri, {
        serverSelectionTimeoutMS: 5000,
        family: 4,
      });
      await User.syncIndexes();
      console.log(`db connected to ${uri}`);
      return;
    } catch (error) {
      console.log(`db connection attempt failed for ${uri}: ${error.message}`);
    }
  }

  console.log("db unavailable; continuing without database connection");
};

export default connectDb;
