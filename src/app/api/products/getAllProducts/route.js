import { connectDB } from "@/utils/connectDB";
import { Product } from "@/models/Product.model";

export async function GET(request) {
  await connectDB();
  const { searchParams } = new URL(request.url);
  let page = searchParams.get("page") || 1;
  let limit = searchParams.get("limit") || 9;
  let sortBy = searchParams.get("sort");
  let category = searchParams.get("category");
  let brand = searchParams.get("brand");
  let query = {};

  if (category) {
    query.category = category;
  }
  if (brand) {
    query.brand = brand;
  }

  try {
    const products = await Product.find(query)
      .limit(limit)
      .skip(page - 1)
      .sort(sortBy);
    const totalItems = products.length;

    return Response.json({products,totalItems});
  } catch (error) {
    return Response.json({
      success: false,
      message: error,
    });
  }
}
