import { connectDB } from "@/utils/connectDB";
import { Brand } from "@/models/Brand.model";

export async function GET(request) {
  await connectDB();

  try {
    const brands = await Brand.find({});

    return Response.json({
      brands,
    });
  } catch (error) {
    return Response.json({
      success: false,
      message: error,
    });
  }
}
