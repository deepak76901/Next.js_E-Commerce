import  mongoose, { Schema, model } from "mongoose";

const brandSchema = new Schema({
  value: {
    type: String,
    required: true,
  },
  label: {
    type: String,
    required: true,
  },
});



export const Brand = mongoose.models.Brand || model("Brand", brandSchema);
