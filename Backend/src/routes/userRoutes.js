import { Router } from "express";
import { protect, adminAuth } from "../middleware/authMiddleware.js";
import {
  getUser,
  getUsers,
  updateUser,
  deleteUser,
  updateUserRole,
} from "../controllers/userController.js";

const userRoutes = Router();

userRoutes.get();
