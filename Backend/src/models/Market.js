import { model, Schema } from "mongoose";

const marketSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
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
        required: true,
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
