import { model, Schema } from "mongoose";

const productSchema = new Schema(
  {
    name: { type: String, required: true },
    category: { type: String },
  },
  { timestamps: true }
);

const product = model("Product", productSchema);
export default product;
