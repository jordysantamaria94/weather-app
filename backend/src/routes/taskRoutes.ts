import { Router } from "express";
import { getAllTasks } from "../controllers/taskController";
import { authenticateToken } from "../middleware/authMiddleware";

const router = Router();

router.get("/tasks/all", authenticateToken, getAllTasks);

export default router;