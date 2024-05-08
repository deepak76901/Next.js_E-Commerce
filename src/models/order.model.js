import mongoose, { Schema, SchemaType, SchemaTypes, model } from "mongoose";

const orderSchema = new Schema({
  userId: {
    type: SchemaTypes.ObjectId,
    ref: "User",
    required: true,
  },
  selectedAddress: {
    type: SchemaTypes.Mixed,
    required: true,
  },
  items: { type: [SchemaTypes.Mixed] },
  totalItems: Number,
  totalAmount: Number,
  paymentMethod: String,
  status: String,
});

export const Orders = mongoose.models.Orders || model("Orders", orderSchema);
