import { model, Schema } from "mongoose";
const userSchema = new Schema({
  username: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
    match: [
      /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/,
      "Please enter a valid email",
    ],
  },
  password: {
    type: String,
    required: true,
  },
  role: {
    type: String,
    enum: ["user", "vendor", "admin"],
    default: "user",
  },
  isVerified: {
    type: Boolean,
    default: false,
  },
  vendorInfo: {
    businessName: String,
    address: String,
    phone: String,
  },
});

const User = model("User", userSchema);
export default User;
