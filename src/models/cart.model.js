import { Schema, model } from "mongoose";

const cartSchema = new Schema({
  quantity: { type: Number, required: true, default: 0 },
  user: { type: Schema.Types.ObjectId, ref: "User" },
  product: { type: Schema.Types.ObjectId, ref: "Product" },
});



export const Cart = model("Cart", cartSchema);
