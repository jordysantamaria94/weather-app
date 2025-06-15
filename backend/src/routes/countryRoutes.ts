import { Router } from "express";
import { getAllCountries } from "../controllers/countryController";
import { authenticateToken } from "../middleware/authMiddleware";

const router = Router();

router.get("/countries/all", authenticateToken, getAllCountries);

export default router;