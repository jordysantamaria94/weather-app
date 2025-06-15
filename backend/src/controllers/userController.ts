import { Request, Response } from "express";
import prisma from "../prisma";

export const getAllUsers = async (
  req: Request,
  res: Response
): Promise<any> => {
  try {
    const users = await prisma.user.findMany({
      select: {
        name: true,
        email: true,
        createdAt: true,
        updatedAt: true
      }
    });

    res.status(200).json({
      flag: true,
      users
    });
  } catch (error) {
    res.status(500).json({ flag: false, error: "Internal Server Error" });
  }
};

export async function updateLastLoginUser(id: number) {
  await prisma.user.update({
    where: { id: id },
    data: { updatedAt: new Date() },
  });
}

export async function findUserByEmail(email: string) {
  return await prisma.user.findUnique({
    where: { email: email },
  });
}