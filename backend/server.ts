// backend/server.ts
import express from "express";
import cors from "cors";
import authRoutes from "./routes/authRoutes"; // 👈 Aquí sí aplica

const app = express();
app.use(cors());
app.use(express.json());

// Aquí se monta el router
app.use("/api/auth", authRoutes);

app.listen(3000, () => {
  console.log("Servidor corriendo en http://localhost:3000");
});

app.get("/", (req, res) => {
  res.send("Backend funcionando!");
});