import RedisStore from "connect-redis";
import IORedis from "ioredis";
import env from "./utils/validEnv";

const redisClient = new IORedis({
  host: env.REDIS_HOST,
  port: env.REDIS_PORT,
  password: env.REDIS_PASSWORD,
});

const redisStore = new (RedisStore as any)({ client: redisClient });

export default redisStore;
