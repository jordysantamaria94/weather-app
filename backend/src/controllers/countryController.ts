import { Request, Response } from "express";
import prisma from "../prisma";

export const getAllCountries = async (
  req: Request,
  res: Response
): Promise<any> => {
  try {
    const countries = await prisma.country.findMany();
    res.status(200).json({
      flag: true,
      countries,
    });
  } catch (error) {
    res.status(500).json({ flag: false, error: "Internal Server Error" });
  }
};