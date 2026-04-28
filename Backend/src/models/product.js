import { model, Schema, mongoose } from "mongoose";

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
    market: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Market",
      required: true, // Products must be associated with a market
    },
    priceHistory: [
      {
        price: {
          type: Number,
          required: true,
        },
        date: {
          type: Date,
          default: Date.now,
        },
        changedBy: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "User",
        },
      },
    ],

    lastUpdated: {
      type: Date,
      default: Date.now,
    },
    isActive: {
      type: Boolean,
      default: true,
    },
  },
  { timestamps: true }
);

//indexing

// Calculate price change before saving
productSchema.pre("save", function (next) {
  if (this.isModified("currentPrice") && this.priceHistory.length > 0) {
    const previousPrice = this.priceHistory[this.priceHistory.length - 1].price;
    this.priceChange = this.currentPrice - previousPrice;
  }
  next();
});

// Indexing
productSchema.index({ category: 1, createdAt: -1 });
productSchema.index({ vendor: 1, isActive: 1 });
productSchema.index({ market: 1, isActive: 1 });

const Product = model("Product", productSchema);
export default Product;
