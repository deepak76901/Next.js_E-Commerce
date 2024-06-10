import { Product } from "@/models/Product.model";
import { connectDB } from "@/utils/connectDB";

export async function GET(_request, { params }) {
  await connectDB();

  try {
   const suggestedProduct = await Product.find({category : params.category})

   return Response.json(suggestedProduct)
  } catch (error) {
    return Response.json({
      success: false,
      message: error,
    });
  }
}
