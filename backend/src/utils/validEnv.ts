import { cleanEnv } from "envalid";
import { str } from "envalid/dist/validators";
import "dotenv/config";

export default cleanEnv(process.env, {
  DB_URI: str(),
  PORT: str(),
});
