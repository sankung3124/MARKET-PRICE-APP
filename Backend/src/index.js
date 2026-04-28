import express from "express";
import "dotenv/config";
import connectToDB from "./config/db.js";
import userRoutes from "./routes/authRoutes.js";
import produtRoutes from "./routes/productRoutes.js";
import marketRoutes from "./routes/marketRoutes.js";
import cors from "cors";

const app = express();
app.use(cors());
app.use(express.json());

app.use("/api/auth", userRoutes);
app.use("/api/products", produtRoutes);
app.use("/api/markets", marketRoutes);
const PORT = process.env.PORT || 3000;
connectToDB();

app.listen(PORT, () => console.log("sever is runing at port " + PORT));
