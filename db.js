import { MongoClient } from "mongodb";
import dotenv from "dotenv";

dotenv.config();
const connectionString = process.env.CONNECTION_URL;

async function mongoConnection() {
  const client = new MongoClient(connectionString);

  await client.connect();

  console.log("Database connected successfully");

  return client;
}

//initializing DB
export const client = await mongoConnection();
