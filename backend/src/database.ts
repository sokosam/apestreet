import { Client } from "pg";

const getClient = async (connection_str: string) => {
  try {
    const client = new Client({
      connectionString: connection_str,
      connectionTimeoutMillis: 1000 * 30,
      idle_in_transaction_session_timeout: 1000 * 30,
      query_timeout: 1000 * 30,
    });
    await client.connect();
    return client;
  } catch (error) {
    console.error(error);
  }
};

export default getClient;
