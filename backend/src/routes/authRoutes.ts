import { Router } from "express";
import { loginUser } from "../controllers/authController";
import { registerUser } from "../controllers/authController";

const router = Router();

router.post("/auth/login", loginUser);
router.post("/auth/register", registerUser);

export default router;