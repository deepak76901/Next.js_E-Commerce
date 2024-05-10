import { Orders } from "@/models/order.model";
import { connectDB } from "@/utils/connectDB";
import { headers } from "next/headers";

export async function GET(_request) {
  await connectDB();

  try {
    const orders = await Orders.find({});

    return Response.json(orders, {
      headers: { "X-Total-Count": orders.length },
    });
  } catch (error) {
    return Response.json({
      success: false,
      message: error,
    });
  }
}
