// import express from "express";
// import dotenv from "dotenv";
// import cors from "cors";
// import userRoutes from "./routes/userRoutes";
// import countryRoutes from "./routes/countryRoutes";
// import taskRoutes from "./routes/taskRoutes";
// import authRoutes from "./routes/authRoutes";
// import weatherRoutes from "./routes/weatherRoutes";

// dotenv.config();

// const app = express();
// const port = process.env.PORT;

// app.use(express.json());

// const corsOptions = {
//   origin: "*",
//   methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
//   credentials: true,
//   optionsSuccessStatus: 204,
// };

// app.use(cors(corsOptions));

// app.use("/api", userRoutes);
// app.use("/api", authRoutes);
// app.use("/api", countryRoutes);
// app.use("/api", taskRoutes);
// app.use("/api", weatherRoutes);

// app
//   .listen(port, () => {
//     console.log(`Server running at http://localhost:${port}`);
//   })
//   .on("error", (error) => {
//     throw new Error(error.message);
//   });

// export default app;

// ... tus imports y configuraciones
import express from 'express';
// ...

const app = express();

// Tus rutas
app.post('/api/auth/login', (req, res) => {
  // ... tu lógica de login
  res.json({ message: 'Login successful' });
});

// ¡Importante! Exporta la instancia de la aplicación
// Vercel la usará como una función serverless
export default app;

// Si también tienes un .listen() para desarrollo local, puedes envolverlo:
// if (process.env.NODE_ENV !== 'production') {
//   const PORT = process.env.PORT || 3000;
//   app.listen(PORT, () => {
//     console.log(`Server running on port ${PORT}`);
//   });
// }