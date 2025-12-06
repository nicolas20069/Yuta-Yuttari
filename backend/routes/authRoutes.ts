import { Router, Request, Response } from "express";
import mysql from "mysql2/promise";
import bcrypt from "bcryptjs";

const router = Router();

// Configuración de conexión a MySQL
const pool = mysql.createPool({
  host: process.env.DB_HOST || "localhost",
  user: process.env.DB_USER || "root",
  password: process.env.DB_PASSWORD || "",
  database: process.env.DB_NAME || "yuta_yuttari",
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0,
});

// Ruta de registro
router.post("/register", async (req: Request, res: Response) => {
  let connection;
  try {
    const { email, password } = req.body;

    // Validaciones básicas
    if (!email || !password) {
      return res
        .status(400)
        .json({ message: "Email y contraseña son requeridos" });
    }

    if (password.length < 6) {
      return res
        .status(400)
        .json({ message: "La contraseña debe tener al menos 6 caracteres" });
    }

    connection = await pool.getConnection();

    // Verificar si el usuario ya existe
    const [rows]: any = await connection.query(
      "SELECT id_users FROM users WHERE email = ?",
      [email]
    );

    if (rows.length > 0) {
      return res.status(409).json({ message: "El email ya está registrado" });
    }

    // Hashear la contraseña
    const hashedPassword = await bcrypt.hash(password, 10);

    // Insertar nuevo usuario
    await connection.query(
      "INSERT INTO users (email, password) VALUES (?, ?)",
      [email, hashedPassword]
    );

    return res.status(201).json({ message: "Usuario registrado exitosamente" });
  } catch (error) {
    console.error("Error en registro:", error);
    return res.status(500).json({ message: "Error en el servidor" });
  } finally {
    if (connection) connection.release();
  }
});

// Ruta de login
router.post("/login", async (req: Request, res: Response) => {
  let connection;
  try {
    const { email, password } = req.body;

    // Validaciones básicas
    if (!email || !password) {
      return res
        .status(400)
        .json({ message: "Email y contraseña son requeridos" });
    }

    connection = await pool.getConnection();

    // Buscar usuario por email
    const [rows]: any = await connection.query(
      "SELECT * FROM users WHERE email = ?",
      [email]
    );

    if (rows.length === 0) {
      return res.status(401).json({ message: "Credenciales incorrectas" });
    }

    const user = rows[0];

    // Comparar contraseña con bcrypt
    const validPassword = await bcrypt.compare(password, user.password);
    if (!validPassword) {
      return res.status(401).json({ message: "Credenciales incorrectas" });
    }

    return res.status(200).json({
      message: "Login exitoso",
      user: { id: user.id, email: user.email },
      token: "fake-token", // Aquí deberías generar un JWT real
    });
  } catch (error) {
    console.error("Error en login:", error);
    return res.status(500).json({ message: "Error en el servidor" });
  } finally {
    if (connection) connection.release();
  }
});

export default router;
