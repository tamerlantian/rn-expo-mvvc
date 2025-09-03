// Interfaces para el módulo de autenticación

// Interfaz para las credenciales de login
export interface LoginCredentials {
  email: string;
  password: string;
}

// Interfaz para el usuario autenticado
export interface AuthUser {
  id: string;
  email: string;
  name: string;
  token: string;
  refreshToken?: string;
}

// Interfaz para la respuesta de login
export interface LoginResponse {
  user: AuthUser;
  token: string;
  refreshToken?: string;
}

// Interfaz para el estado de autenticación
export interface AuthState {
  isAuthenticated: boolean;
  user: AuthUser | null;
  loading: boolean;
  error: string | null;
}

// Interfaz para la respuesta de token refresh
export interface RefreshTokenResponse {
  token: string;
  refreshToken?: string;
}

// Interfaz para errores de autenticación
export interface AuthError {
  message: string;
  code?: string;
  status?: number;
}
