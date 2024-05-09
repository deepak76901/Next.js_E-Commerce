import { Cart } from "@/models/cart.model";
import { connectDB } from "@/utils/connectDB";

export async function DELETE(request, { params }) {
  await connectDB();

  try {
    const response = await Cart.findByIdAndDelete(params.itemId);
    return Response.json({ success: true, message: "Item deleted from Cart" });
  } catch (error) {
    return Response.json({
      success: false,
      message: "Failing to delete item from cart",
    });
  }
}
