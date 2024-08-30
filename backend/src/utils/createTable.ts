import { cleanEnv } from "envalid";
import getPool from "../database";
import createHttpError from "http-errors";

export interface createColumnProps {
  column_name: string;
  type?: string;
  unique?: boolean;
  reference?: string;
  onDelete?: string;
  primary_key?: boolean;
  not_null?: boolean;
  kwargs?: string;
}
export const createTable = async (
  table_name: string,
  DB_URI: string,
  columns: createColumnProps[]
) => {
  let query = `CREATE TABLE IF NOT EXISTS ${table_name} (`;
  let custom_query = "";
  for (let i = 0; i < columns.length; i++) {
    if (columns[i].primary_key) {
      custom_query += columns[i].column_name + " SERIAL PRIMARY KEY, ";
      continue;
    }

    custom_query += columns[i].type
      ? columns[i].column_name + ` ${columns[i].type}`
      : columns[i].column_name;

    custom_query += columns[i].reference
      ? " REFERENCES " + columns[i].reference
      : "";

    custom_query +=
      columns[i].unique || columns[i].primary_key ? " UNIQUE" : "";
    custom_query += columns[i].not_null ? " NOT NULL" : "";
    custom_query += columns[i].onDelete
      ? " ON DELETE " + columns[i].onDelete
      : "";
    custom_query += columns[i].kwargs ? " " + columns[i].kwargs : "";
    custom_query += ", ";
  }
  custom_query = custom_query.slice(0, -2); // Remove the last comma
  custom_query += ");";
  try {
    const client = await getPool(DB_URI);
    if (!client) {
      throw createHttpError(401, "COULD NOT CONNECT TO DATABASE");
    }
    await client.query(query + custom_query);
    console.log("Table created with command: " + query + custom_query);
  } catch (error) {
    console.log("Table failed to create with command: " + query + custom_query);
    console.error(error);
  }
};
