import { Product } from "@/models/Product.model";
import { connectDB } from "@/utils/connectDB";

export async function POST(request) {
  await connectDB();

  const product = await request.json();

  try {
    const newProduct = new Product(product);

    const response = await newProduct.save();

    return Response.json(response);
  } catch (error) {
    return Response.json({
      success: false,
      message: error,
    });
  }
}
