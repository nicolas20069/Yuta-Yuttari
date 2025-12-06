import { Request, Response } from "express";

export const register = (req: Request, res: Response) => {
  const { email, password } = req.body;

  // Validaciones básicas
  if (!email || !password) {
    return res.status(400).json({ message: "Campos obligatorios" });
  }

  // Simulación de éxito
  return res.status(201).json({ message: "Usuario registrado exitosamente" });
};

export const login = (req: Request, res: Response) => {
  const { email, password } = req.body;

  // Validaciones básicas
  if (!email || !password) {
    return res.status(400).json({ message: "Credenciales requeridas" });
  }

  // Simulación de éxito
  return res.status(200).json({ message: "Inicio de sesión exitoso" });
};
