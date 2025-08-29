import express from "express";
import "dotenv/config";
import connectToDB from "./config/db.js";
import userRoutes from "./routes/authRoutes.js";

const app = express();
app.use(express.json());

app.use("/api/users", userRoutes);

const PORT = process.env.PORT || 3000;
connectToDB();

app.listen(PORT, () => console.log("sever is runing at port " + PORT));
