import { MongoClient } from "mongodb";

if (!process.env.MONGODB_URI) {
  throw new Error("Please add your Mongo URI to .env.local");
}

const client = new MongoClient(process.env.MONGODB_URI);
const dbName = "ocean_pearl_restro";

export async function getDB() {
  await client.connect();
  return client.db(dbName);
}
