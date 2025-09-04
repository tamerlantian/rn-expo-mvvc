import { HttpBaseRepository } from '../../../core/repositories/http-base.repository';
import {
  LoginCredentials,
  LoginResponse,
  RefreshTokenResponse,
  RegisterCredentials,
  RegisterResponse,
} from '../models/Auth';

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
    return this.post<LoginResponse>('seguridad/login/', credentials);
  }

  /**
   * Registra un nuevo usuario
   * @param userData Datos del usuario a registrar
   * @returns Promise con la respuesta del registro
   */
  async register(userData: RegisterCredentials): Promise<RegisterResponse> {
    return this.post<RegisterResponse>('seguridad/usuario/nuevo/', userData);
  }

  /**
   * Refresca el token de autenticación
   * @param refreshToken Token de refresco
   * @returns Promise con el nuevo token
   */
  async refreshToken(refreshToken: string): Promise<RefreshTokenResponse> {
    return this.post<RefreshTokenResponse>('seguridad/refresh/', { refreshToken });
  }

  /**
   * Solicita el cambio de contraseña
   * @param email Correo electrónico del usuario
   * @returns Promise con la confirmación del cambio de contraseña
   */
  async forgotPassword(username: string): Promise<boolean> {
    return this.post<boolean>('seguridad/usuario/cambio-clave-solicitar/', { username });
  }

  /**
   * Cierra la sesión del usuario
   * @returns Promise con la confirmación del logout
   */
  async logout(): Promise<boolean> {
    return this.post<boolean>('seguridad/logout/', {});
  }
}
