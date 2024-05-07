import { Cart } from "@/models/cart.model";
import { connectDB } from "@/utils/connectDB";

export async function POST(request) {
  await connectDB();

  try {
    const { user, product, quantity } = await request.json();
    const newItem = new Cart({ user, product, quantity });
    const data = await newItem.save();

    if (data) {
      return Response.json(
        {
          success: true,
          message: "Item added successfully",
        },
        {
          status: 200,
        }
      );
    }
  } catch (error) {
    return Response.json(
      {
        success: false,
        message: "Item not added",
      },
      { status: 400 }
    );
  }
}
