import { Router } from "express";
import {
  addProduct,
  getProducts,
  getProduct,
  deleteProduct,
} from "../controllers/productControllers";
import protect from "../middleware/authMiddleware";

const produtRoutes = Router();

produtRoutes.get("/", protect, getProducts);
produtRoutes.get("/:id", protect, getProduct);
produtRoutes.delete("/:id", protect, deleteProduct);
produtRoutes.post("/", protect, addProduct);
