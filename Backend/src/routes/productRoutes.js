import { Router } from "express";
import {
  addProduct,
  getProducts,
  getProduct,
  deleteProduct,
  searchProducts,
  updateProduct,
  getVendorProducts,
} from "../controllers/productControllers.js";
import { protect, vendorAuth } from "../middleware/authMiddleware.js";

const produtRoutes = Router();

produtRoutes.get("/", getProducts);
produtRoutes.get("/serach", searchProducts);
produtRoutes.get("/:id", getProduct);
produtRoutes.delete("/:id", protect, vendorAuth, deleteProduct);
produtRoutes.post("/", protect, vendorAuth, addProduct);
produtRoutes.get("/vendor/my-products", protect, vendorAuth, getVendorProducts);

export default produtRoutes;
