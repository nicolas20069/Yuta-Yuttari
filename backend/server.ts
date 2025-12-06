// backend/server.ts
import express from "express";
import cors from "cors";
import authRoutes from "./routes/authRoutes";
import userRoutes from "./routes/userRoutes";
import path from "path";

const app = express();
app.use(cors());
app.use(express.json());

app.use("/api/user", userRoutes);

// Servir archivos estáticos de la carpeta uploads
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

// Aquí se monta el router
app.use("/api/auth", authRoutes);

app.listen(3000, () => {
  console.log("Servidor corriendo en http://localhost:3000");
});

app.get("/", (req, res) => {
  res.send("Backend funcionando!");
});

app.use("/api/user", userRoutes);
