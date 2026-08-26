import dns from "node:dns";
import mongoose from "mongoose";

const dnsServers = (process.env.MONGODB_DNS_SERVERS || "1.1.1.1,8.8.8.8")
  .split(",")
  .map((server) => server.trim())
  .filter(Boolean);

dns.setServers(dnsServers);

const connectDb = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI, {
      serverSelectionTimeoutMS: 10000,
      family: 4,
    });
    console.log("db connected");
  } catch (error) {
    console.log(`db error ${error}`);
  }
};

export default connectDb;
