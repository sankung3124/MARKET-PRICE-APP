import { model, Schema } from "mongoose";

const marketSchema = new Schema(
  {
    name: { type: String, required: true },
    location: { type: String },
  },
  { timestamps: true }
);

const market = model("Market", marketSchema);
export default market;
