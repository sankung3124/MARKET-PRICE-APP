import mongoose from "mongoose";
import "dotenv/config";

async function connectToDB() {
  await mongoose.connect(process.env.MONGO_URL);
  console.log("connected to the databse");
}
export default connectToDB;
