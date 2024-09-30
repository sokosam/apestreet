import { createTable } from "./createTable";
import env from "./validEnv";

const createUserbase = async () => {
  await createTable("USERBASE", env.DB_URI, [
    {
      column_name: "ID",
      primary_key: true,
    },
    {
      column_name: "USERNAME",
      not_null: true,
      unique: false,
      type: "VARCHAR(50)",
    },
    {
      column_name: "EMAIL",
      not_null: true,
      unique: true,
      type: "VARCHAR(50)",
    },
    {
      column_name: "PASSWORD",
      not_null: true,
      unique: false,
      type: "VARCHAR(60)",
    },
    {
      column_name: "DESCRIPTION",
      not_null: true,
      unique: false,
      type: "VARCHAR(200)",
    },
  ]);
};

export default createUserbase;
