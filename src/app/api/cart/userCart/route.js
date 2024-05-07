import { Cart } from "@/models/cart.model";
import { connectDB } from "@/utils/connectDB";
import mongoose from "mongoose";

export async function GET(request) {
  await connectDB();
  try {
    const {searchParams} = new URL(request.url)
    const userId = searchParams.get("user")
  
    const user = new mongoose.Types.ObjectId(userId)
    const cartItems = await Cart.find({ user}).populate(["product"]);
  

    return Response.json(cartItems);
  } catch (error) {
    return Response.json(
      {
        success: false,
        message: error,
      },
      { status: 400 }
    );
  }
}
