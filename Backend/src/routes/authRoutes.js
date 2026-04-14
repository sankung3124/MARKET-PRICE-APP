import { Router } from "express";
import { register } from "../controllers/authControllers.js";
import { login } from "../controllers/authControllers.js";

const authRoutes = Router();
authRoutes.post("/register", register);
//Login route
authRoutes.post("/login", login);

export default authRoutes;
