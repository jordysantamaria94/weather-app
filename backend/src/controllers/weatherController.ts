import { Request, Response } from "express";
import dotenv from "dotenv";
import prisma from "../prisma";

dotenv.config();

const WEATHERAPI_BASE_URL = "http://api.weatherapi.com/v1";

export const getWeather = async (
  req: Request,
  res: Response
): Promise<void> => {
  const location = req.query.location;
  const timezone = req.query.timezone;
  const apiKey = process.env.WEATHER_API_KEY;

  if (!location) {
    res.status(400).json({
      message:
        "Se requiere una ubicación para obtener el clima (ej. /weather/current?location=Mexico).",
    });
    return;
  }

  if (!apiKey) {
    res.status(500).json({
      message: "Error de configuración del servidor: API Key no encontrada.",
    });
    return;
  }

  try {

    const countryWithTimezone = await prisma.country.findUnique({
      where: { id: +location },
      select: {
        id: true,
        name: true,
        timezones: true,
      }
    });

    let indexTimezone: number | undefined = 0

    if (timezone) {
      indexTimezone = countryWithTimezone?.timezones?.findIndex(
        (tz) => tz.id === +timezone
      );
    }

    const tasks = await prisma.tasks.findMany();
    const countries = await prisma.country.findMany();

    const url = new URL(`${WEATHERAPI_BASE_URL}/current.json`);
    url.searchParams.append("key", apiKey);
    url.searchParams.append("q", countryWithTimezone?.timezones?.[indexTimezone || 0].coords!);
    url.searchParams.append("lang", "es");

    const response = await fetch(url.toString());

    if (!response.ok) {
      throw new Error(`Error al obtener el clima: ${response.statusText}`);
    }

    const data = await response.json();

    const formattedWeather = {
      location: {
        country: data.location.country,
        capital: data.location.name,
        region: data.location.region,
        lat: data.location.lat,
        lon: data.location.lon,
        coords: data.location.lat + ", " + data.location.lon,
      },
      condition: {
        temp: data.current.temp_c,
        currently: data.current.condition.text,
        image: data.current.condition.icon,
      },
      localtime: {
        time: data.location.localtime,
        timezone_id: data.location.tz_id,
      },
      timezones: countryWithTimezone?.timezones,
      tasks,
      countries
    };

    res.status(200).json(formattedWeather);
  } catch (error) {
    console.error("Error al obtener el clima:", error);
    res.status(500).json({ message: "Error al obtener el clima." });
  }
};
