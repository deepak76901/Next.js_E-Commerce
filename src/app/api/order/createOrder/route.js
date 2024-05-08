import { Orders } from "@/models/order.model";
import { connectDB } from "@/utils/connectDB";

export async function POST(request) {
  await connectDB();

  const order = await request.json();
  try {

    const newOrder = new Orders(order);
    const data = await newOrder.save();

    return Response.json(newOrder);
  } catch (error) {
    return Response.json({
      success: false,
      message: error,
    });
  }
}
