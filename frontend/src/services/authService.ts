import api from "./api";

// Interfaz para la respuesta del backend
interface AuthResponse {
  message: string;
  user?: {
    id: number;
    email: string;
    name?: string;
    phone?: string;
  };
  token?: string;
}

// Interfaz para el registro
interface RegisterPayload {
  name: string;
  email: string;
  phone: string;
  password: string;
}

// Función para registrar usuario (envía objeto completo)
export const registerUser = async (
  data: RegisterPayload
): Promise<AuthResponse> => {
  const response = await api.post<AuthResponse>("/api/auth/register", data);
  return response.data;
};

// Función para iniciar sesión (email y password)
export const loginUser = async (
  email: string,
  password: string
): Promise<AuthResponse> => {
  const response = await api.post<AuthResponse>("/api/auth/login", {
    email,
    password,
  });
  return response.data;
};