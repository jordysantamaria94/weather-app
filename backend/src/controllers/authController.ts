import { Request, Response } from "express";
import jwt from "jsonwebtoken";
import { findUserByEmail, updateLastLoginUser } from "./userController";
import bcrypt from "bcryptjs";
import prisma from "../prisma";

export const loginUser = async (req: Request, res: Response): Promise<any> => {
  if (req.body === undefined) {
    return res
      .status(400)
      .json({ flag: false, error: "Es necesario enviar el formulario" });
  }

  const { email, password } = req.body;

  if (!email || !password) {
    return res
      .status(400)
      .json({ message: "Correo y contraseña son requeridos." });
  }

  try {
    const user: any = await findUserByEmail(email);

    if (!user) {
      return res.status(401).json({ message: "Credenciales inválidas." });
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!isPasswordValid) {
      return res.status(401).json({ message: "Credenciales inválidas." });
    }

    const token = generateToken(user);

    if (token === undefined) {
      console.error("JWT_SECRET is undefined.");
      return res
        .status(500)
        .json({ message: "Error de configuración del servidor." });
    }

    const { password: _, ...userWithoutPassword } = user;

    await updateLastLoginUser(user.id);

    res.status(200).json({
      flag: true,
      data: {
        user: userWithoutPassword,
        token,
      },
    });
  } catch (error) {
    res.status(500).json({
      message: "Error interno del servidor durante el inicio de sesión.",
    });
  }
};

export const registerUser = async (
  req: Request,
  res: Response
): Promise<any> => {
  if (req.body === undefined) {
    return res
      .status(400)
      .json({ flag: false, error: "Es necesario enviar el formulario" });
  }

  const { name, email, password } = req.body;

  if (!name || !email || !password) {
    return res.status(400).json({
      flag: false,
      error: "Nombre, correo y contraseña son necesarios",
    });
  }

  try {
    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = await prisma.user.create({
      data: {
        name,
        email,
        password: hashedPassword,
      },
    });

    const { password: _, ...userWithoutPassword } = newUser;
    res.status(201).json({
      flag: true,
      data: {
        user: userWithoutPassword,
        token: generateToken(newUser),
      },
    });
  } catch (error) {
    if (
      error instanceof Error &&
      error.message.includes("Unique constraint failed")
    ) {
      return res
        .status(409)
        .json({ flag: false, error: "El correo ya existe" });
    }
    res.status(500).json({ flag: false, error: "Internal Server Error" });
  }
};

export function generateToken(user: any): any {
  const jwtSecret = process.env.JWT_SECRET;

  if (!jwtSecret) {
    return;
  }

  const tokenPayload = {
    userId: user.id,
    userEmail: user.email,
  };

  const token = jwt.sign(tokenPayload, jwtSecret, { expiresIn: "1h" });

  return token;
}