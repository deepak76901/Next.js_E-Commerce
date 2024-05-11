import { Product } from "@/models/Product.model";
import { connectDB } from "@/utils/connectDB";

export async function PATCH(request, { params }) {
  await connectDB();
  const changedProduct = await request.json();

  try {
    const updatedProduct = await Product.findByIdAndUpdate(
      params.id,
      changedProduct,
      { new: true }
    );

    return Response.json(updatedProduct)
  } catch (error) {
    return Response.json({
        success: false,
        message: error,
      });
  }
}
