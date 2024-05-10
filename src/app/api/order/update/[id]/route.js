import { Orders } from "@/models/order.model";
import { connectDB } from "@/utils/connectDB";

export async function PATCH(request, { params }) {
  await connectDB();
  const order = await request.json();
  try {
    const updatedOrder = await Orders.findByIdAndUpdate(params.id, order, {
      new: true,
    });

    return Response.json(updatedOrder);
  } catch (error) {
    return Response.json({
      success: false,
      message: error,
    });
  }
}
