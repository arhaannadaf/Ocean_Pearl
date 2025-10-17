import { NextResponse } from "next/server";
import { getDB } from "@/lib/mongodb";

export async function POST(req: Request) {
  try {
    const db = await getDB();
    const orderData = await req.json(); // { items: [...], total: 500 }

    const order = {
      ...orderData,
      createdAt: new Date(),
      status: "completed", // or "pending" if you want to process later
    };

    const result = await db.collection("orders").insertOne(order);

    return NextResponse.json({ success: true, orderId: result.insertedId });
  } catch (err) {
    console.error("Order insert failed:", err);
    return NextResponse.json(
      { success: false, error: (err as Error).message },
      { status: 500 }
    );
  }
}
