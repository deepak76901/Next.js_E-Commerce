import { Product } from "@/models/Product.model";
import { connectDB } from "@/utils/connectDB";

export async function DELETE(request, { params }) {
  await connectDB();

  try {
    await Product.findByIdAndDelete(params.id);
    return Response.json({
      success: true,
      message: "Product Deleted Successfully",
    });
  } catch (error) {
    return Response.json({
      success: false,
      message: error,
    });
  }
}
