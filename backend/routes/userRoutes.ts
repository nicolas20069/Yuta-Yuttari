import { Router } from "express";
import { verifyToken } from "../middlewares/verifyToken";
import multer from "multer";

const router = Router();
const upload = multer({ dest: "uploads/" });

router.get("/perfil", verifyToken, (req, res) => {
  res.json({
    message: "Acceso permitido",
    user: (req as any).user,
  });
});

router.post("/avatar", verifyToken, upload.single("avatar"), (req, res) => {
  if (!req.file) {
    return res.status(400).json({ message: "No se subió ningún archivo" });
  }
  const fileUrl = `http://localhost:3000/uploads/${req.file.filename}`;
  res.json({ message: "Avatar guardado", url: fileUrl });
});

export default router;
