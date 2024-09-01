import { createTable } from "./createTable";
import env from "./validEnv";

const createStockWatchlist = async () => {
  await createTable("STOCK_WATCHLIST", env.DB_URI, [
    {
      column_name: "ID",
      primary_key: true,
      type: "INTEGER",
    },
    {
      column_name: "user_id",
      reference: "USERBASE(ID)",
      type: "INTEGER",
      onDelete: "CASCADE",
    },
    {
      column_name: "STOCK_SYMBOL",
      type: "VARCHAR(10)",
      not_null: true,
    },
    {
      column_name: "CREATED_AT",
      kwargs: "TIMESTAMP DEFAULT CURRENT_TIMESTAMP",
    },
  ]);
};

export default createStockWatchlist;
