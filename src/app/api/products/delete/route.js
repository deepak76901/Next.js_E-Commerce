import { Product } from "@/models/Product.model";
import { connectDB } from "@/utils/connectDB";

export async function DELETE(request) {
  await connectDB();

  try {
    const productList = await Product.deleteMany({
      rating: null,
    });

    return Response.json(productList);
  } catch (error) {
    return Response.json({
      success: false,
      message: error,
    });
  }
}
