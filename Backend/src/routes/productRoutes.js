import { Router } from "express";
import {
  addProduct,
  getProducts,
  getProduct,
  deleteProduct,
  searchProducts,
} from "../controllers/productControllers.js";
import { protect } from "../middleware/authMiddleware.js";

const produtRoutes = Router();

produtRoutes.get("/", protect, getProducts);
produtRoutes.get("/:id", protect, getProduct);
produtRoutes.delete("/:id", protect, deleteProduct);
produtRoutes.post("/", protect, addProduct);
produtRoutes.get("/search", searchProducts);

export default produtRoutes;
