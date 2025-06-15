import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import userRoutes from "../routes/userRoutes";
import countryRoutes from "../routes/countryRoutes";
import taskRoutes from "../routes/taskRoutes";
import authRoutes from "../routes/authRoutes";
import weatherRoutes from "../routes/weatherRoutes";

dotenv.config();

const app = express();
const port = process.env.PORT;

app.use(express.json());

const corsOptions = {
  origin: "*",
  methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
  credentials: true,
  optionsSuccessStatus: 204,
};

app.use(cors(corsOptions));

app.get('/api/test', (req, res) => {
  console.log('¡La ruta /api/test fue alcanzada!'); // Este mensaje aparecerá en los Runtime Logs si funciona
  res.status(200).json({ message: '¡Tu API de Express en Vercel está funcionando!', timestamp: new Date() });
});

app.use("/api", userRoutes);
app.use("/api", authRoutes);
app.use("/api", countryRoutes);
app.use("/api", taskRoutes);
app.use("/api", weatherRoutes);

// app
//   .listen(port, () => {
//     console.log(`Server running at http://localhost:${port}`);
//   })
//   .on("error", (error) => {
//     throw new Error(error.message);
//   });

export default app;