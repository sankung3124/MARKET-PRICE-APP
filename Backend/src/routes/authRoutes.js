import { Router } from "express";
import { register } from "../controllers/authControllers.js";
import { login } from "../controllers/authControllers.js";

const userRoutes = Router();
userRoutes.post("/register", register);
//Login route
userRoutes.post("/login", login);

export default userRoutes;
