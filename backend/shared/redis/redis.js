import Redis from "ioredis";

const redis = new Redis(process.env.REDIS_URL || "redis://localhost:6379", {
  enableOfflineQueue: true,
  maxRetriesPerRequest: 3,
  retryStrategy(times) {
    return Math.min(times * 200, 2000);
  },
});

redis.on("connect", () => {
  console.log("redis connected");
});

redis.on("error", (error) => {
  console.error("redis error:", error.message);
});

export default redis;
