import { Router } from "express";
import { protect, adminAuth } from "../middleware/authMiddleware.js";
import {
  createMarket,
  getMarket,
  getMarkets,
  getMarketProducts,
  updateMarket,
} from "../controllers/marketControllers.js";
const marketRoutes = Router();

marketRoutes.post("/", protect, adminAuth, createMarket);
marketRoutes.get("/:id", getMarket);
marketRoutes.get("/", getMarkets);
marketRoutes.put("/:id", protect, adminAuth, updateMarket);
