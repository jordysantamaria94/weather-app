import { Router } from "express";
import { getWeather } from "../controllers/weatherController";
import { authenticateToken } from "../middleware/authMiddleware";

const router = Router();

router.get("/weather", authenticateToken, getWeather);

export default router;