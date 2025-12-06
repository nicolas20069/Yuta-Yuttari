import api from "./api";

interface AuthResponse {
  message: string;
  user?: {
    id: number;
    email: string;
  };
  token?: string;
}

export const registerUser = async (
  email: string,
  password: string
): Promise<AuthResponse> => {
  const response = await api.post<AuthResponse>("/api/auth/register", {
    email,
    password,
  });
  return response.data;
};

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
