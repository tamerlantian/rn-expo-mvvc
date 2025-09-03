import { HttpBaseRepository } from '../../../core/repositories/http-base.repository';
import { LoginCredentials, LoginResponse, RefreshTokenResponse } from '../models/Auth';

/**
 * Repositorio para manejar las operaciones de API relacionadas con autenticación
 */
export class AuthRepository extends HttpBaseRepository {
  /**
   * Realiza el login del usuario
   * @param credentials Credenciales de login (email y password)
   * @returns Promise con la respuesta del login
   */
  async login(credentials: LoginCredentials): Promise<LoginResponse> {
    return this.post<LoginResponse>('auth/login', credentials);
  }

  /**
   * Registra un nuevo usuario
   * @param userData Datos del usuario a registrar
   * @returns Promise con la respuesta del registro
   */
  async register(
    userData: Omit<LoginCredentials, 'token'> & { name: string },
  ): Promise<LoginResponse> {
    return this.post<LoginResponse>('auth/register', userData);
  }

  /**
   * Refresca el token de autenticación
   * @param refreshToken Token de refresco
   * @returns Promise con el nuevo token
   */
  async refreshToken(refreshToken: string): Promise<RefreshTokenResponse> {
    return this.post<RefreshTokenResponse>('auth/refresh', { refreshToken });
  }

  /**
   * Cierra la sesión del usuario
   * @returns Promise con la confirmación del logout
   */
  async logout(): Promise<boolean> {
    return this.post<boolean>('auth/logout', {});
  }

  /**
   * Verifica si el token actual es válido
   * @returns Promise con la validez del token
   */
  async validateToken(): Promise<boolean> {
    return this.get<boolean>('auth/validate');
  }
}
