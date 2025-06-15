// src/middlewares/authMiddleware.ts
import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();

declare global {
  namespace Express {
    interface Request {
      user?: {
        userId: number;
        userEmail: string;
      };
    }
  }
}

export const authenticateToken = (
  req: Request,
  res: Response,
  next: NextFunction
): any => {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];

  if (!token) {
    return res.status(401).json({ message: "Token no proporcionado." });
  }

  const secretKey = process.env.JWT_SECRET;
  if (!secretKey) {
    return res.status(500).json({
      message:
        "Error de configuración del servidor: JWT_SECRET no está definido.",
    });
  }

  jwt.verify(token, secretKey, (err, user) => {
    if (err) {
      return res.status(403).json({ message: "Token inválido." });
    }

    req.user = user as { userId: number; userEmail: string };

    next();
  });
};
