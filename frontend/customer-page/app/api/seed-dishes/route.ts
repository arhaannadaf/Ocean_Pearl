import { NextResponse } from "next/server";
import { getDB } from "@/lib/mongodb";
import { dishes } from "@/dishes_data/dishes";

export async function POST() {
  try {
    const db = await getDB();
    const collection = db.collection("dishes");

    // Clear collection before inserting
    await collection.deleteMany({});

    // Insert all dishes
    const result = await collection.insertMany(dishes);

    return NextResponse.json({
      success: true,
      insertedCount: result.insertedCount
    });
  } catch (err) {
    console.error("Error inserting dishes:", err);
    return NextResponse.json(
      { success: false, error: (err as Error).message },
      { status: 500 }
    );
  }
}
