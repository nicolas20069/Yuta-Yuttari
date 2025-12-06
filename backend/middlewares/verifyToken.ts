import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";

export const verifyToken = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1]; // formato: "Bearer <token>"

  if (!token) {
    return res.status(403).json({ message: "Token requerido" });
  }

  try {
    const decoded = jwt.verify(
      token,
      process.env.JWT_SECRET || "mi_secreto_super_seguro"
    );
    (req as any).user = decoded; // guardamos datos del usuario en la request
    next();
  } catch (error) {
    return res.status(401).json({ message: "Token inválido o expirado" });
  }
};
