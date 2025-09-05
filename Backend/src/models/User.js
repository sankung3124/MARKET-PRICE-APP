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
