import { model, Schema } from "mongoose";

const productSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    category: {
      type: String,
      required: true,
      enum: ["Grain", "Seafood", "Oils", "Vegetables"],
    },
    currentPrice: {
      type: Number,
      required: true,
      min: 0,
    },
    priceChange: {
      type: Number,
      default: 0,
    },

    vendor: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    lastUpdated: {
      type: Date,
      default: Date.now,
    },
  },
  { timestamps: true }
);

//indexing

productSchema.index({ category: 1, lastUpdated: -1 });

const Product = model("Product", productSchema);
export default Product;
