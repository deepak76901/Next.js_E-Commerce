import { Orders } from "@/models/order.model";
import { connectDB } from "@/utils/connectDB";
import mongoose from "mongoose";

export async function GET(request, { params }) {
  await connectDB();
  const user = new mongoose.Types.ObjectId(params.userId);
  try {
    const orders = await Orders.find({ userId: user });
    return Response.json(orders);
  } catch (error) {
    return Response.json({
      success: false,
      message: "fail to fetch user orders",
    });
  }
}
