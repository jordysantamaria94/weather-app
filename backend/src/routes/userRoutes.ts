import { Router } from "express";
import { getAllUsers } from "../controllers/userController";
import { authenticateToken } from "../middleware/authMiddleware";

const router = Router();

router.get("/users/all", authenticateToken, getAllUsers);

export default router;