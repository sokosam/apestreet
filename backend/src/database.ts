import { Pool } from "pg";

const getPool = async (connection_str: string) => {
  try {
    const client = new Pool({ connectionString: connection_str });
    await client.connect();
    return client;
  } catch (error) {
    console.error(error);
  }
};

export default getPool;
