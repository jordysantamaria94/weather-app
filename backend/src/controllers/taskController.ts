import { Request, Response } from "express";
import prisma from "../prisma";

export const getAllTasks = async (
  req: Request,
  res: Response
): Promise<any> => {
  try {
    const tasks = await prisma.tasks.findMany();
    res.status(200).json({
      flag: true,
      tasks,
    });
  } catch (error) {
    res.status(500).json({ flag: false, error: "Internal Server Error" });
  }
};