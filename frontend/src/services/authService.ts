import api, { setAuthToken } from "./api";

// Interfaz para la respuesta del backend
interface AuthResponse {
  message: string;
  user?: {
    id: number;
    email: string;
    name?: string;
    phone?: string;
  };
  accessToken?: string;
  tokenType?: string;
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
  // Do not auto-save token on register — require email verification first
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
  if (response.data?.accessToken) setAuthToken(response.data.accessToken);
  return response.data;
};

// Obtener perfil del usuario autenticado
export const getProfile = async (): Promise<{ user: any }> => {
  const response = await api.get('/api/auth/profile');
  return response.data;
};

// Validar token / sesión
export const validateToken = async (): Promise<{ valid: boolean; userId?: string }> => {
  const response = await api.get('/api/auth/verify-token');
  return response.data;
};

export const resendVerification = async (email: string) => {
  const response = await api.post('/api/auth/resend', { email });
  return response.data;
};
