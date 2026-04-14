import { model, Schema } from "mongoose";

const marketSchema = new Schema(
  {
    name: {
      type: String,
      required: [true, "Market name is Required"],
      trim: true,
      unique: true,
    },
    location: {
      address: {
        type: String,
        required: true,
      },
      city: {
        type: String,
        required: [true, "city is required"],
      },
    },

    isActive: {
      type: Boolean,
      default: true,
    },
    categories: [
      {
        type: String, // Popular categories in this market
      },
    ],
  },

  { timestamps: true }
);

const Market = model("Market", marketSchema);
export default Market;
