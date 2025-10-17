#!/usr/bin/env tsx
// Must be first: load environment variables
import * as dotenv from "dotenv";
dotenv.config({ path: ".env.local" }); // explicitly load .env.local

import { MongoClient } from "mongodb";
import { dishes } from "../dishes_data/dishes";

// MongoDB setup
const uri = process.env.MONGODB_URI;
if (!uri) {
  console.error("❌ MONGODB_URI not found in environment variables");
  process.exit(1);
}
const client = new MongoClient(uri);
const dbName = "ocean_pearl_restro";

async function seedDishes() {
  try {
    await client.connect();
    console.log("✅ MongoDB connected");

    const db = client.db(dbName);
    const dishesCollection = db.collection("dishes");

    await dishesCollection.deleteMany({});
    console.log("🧹 Old dishes removed");

    await dishesCollection.insertMany(dishes);
    console.log(`🍽 ${dishes.length} dishes added successfully!`);

    await client.close();
    process.exit(0);
  } catch (error) {
    console.error("❌ Error seeding dishes:", error);
    await client.close();
    process.exit(1);
  }
}

seedDishes();
