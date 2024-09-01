import { cleanEnv } from "envalid";
import { str, num } from "envalid/dist/validators";
import "dotenv/config";

export default cleanEnv(process.env, {
  DB_URI: str(),
  PORT: str(),
  SECRET: str(),
  REDIS_HOST: str(),
  REDIS_PORT: num(),
  // REDIS_URL: str(),
  REDIS_PASSWORD: str(),
});
