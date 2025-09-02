import axios, { AxiosInstance, AxiosRequestConfig } from 'axios';
import { environment } from '../../config/environment';
import { ApiConfig, ApiQueryParametros, RequestOptions } from '../interfaces/api.interface';

/**
 * Base repository for HTTP communications using Axios
 */
export class HttpBaseRepository {
  private axiosInstance: AxiosInstance;
  private baseUrl: string;

  constructor(config?: ApiConfig) {
    this.baseUrl = config?.baseUrl || environment.apiBase;
    
    this.axiosInstance = axios.create({
      baseURL: this.baseUrl,
      timeout: config?.timeout || environment.timeout,
      headers: {
        'Content-Type': 'application/json',
        ...config?.headers,
      },
    });

    // Add request interceptor for handling tokens, etc.
    this.axiosInstance.interceptors.request.use(
      (config) => {
        // You can modify the request config here (add auth tokens, etc.)
        return config;
      },
      (error) => {
        return Promise.reject(error);
      }
    );

    // Add response interceptor for handling errors
    this.axiosInstance.interceptors.response.use(
      (response) => {
        return response;
      },
      (error) => {
        // Handle errors globally here
        return Promise.reject(error);
      }
    );
  }

  /**
   * Determines if a URL is complete (starts with http:// or https://)
   * @param url URL or endpoint to check
   * @returns boolean indicating if it's a complete URL
   */
  private isFullUrl(url: string): boolean {
    return url.startsWith('http://') || url.startsWith('https://');
  }

  /**
   * Builds the complete URL if necessary
   * @param endpoint Endpoint or complete URL
   * @returns Complete URL for the request
   */
  private buildUrl(endpoint: string): string {
    if (this.isFullUrl(endpoint)) {
      return endpoint; // If it's already a complete URL, return it as is
    }
    // Normalize the path to avoid double slashes
    const normalizedEndpoint = endpoint.startsWith('/') ? endpoint.substring(1) : endpoint;
    return `${this.baseUrl}/${normalizedEndpoint}`;
  }

  /**
   * GET method for retrieving data
   * @param endpoint API endpoint or complete URL
   * @param params Query parameters
   * @param options Additional request options
   * @returns Promise with the response data
   */
  public async get<T>(endpoint: string, params: ApiQueryParametros = {}, options: RequestOptions = {}): Promise<T> {
    const url = this.buildUrl(endpoint);
    const config: AxiosRequestConfig = {
      params,
      headers: options.headers,
      timeout: options.timeout,
    };
    
    const response = await this.axiosInstance.get<T>(url, config);
    return response.data;
  }

  /**
   * POST method for creating data
   * @param endpoint API endpoint or complete URL
   * @param data Request body data
   * @param options Additional request options
   * @returns Promise with the response data
   */
  public async post<T>(endpoint: string, data: any, options: RequestOptions = {}): Promise<T> {
    const url = this.buildUrl(endpoint);
    const config: AxiosRequestConfig = {
      headers: options.headers,
      params: options.params,
      timeout: options.timeout,
    };
    
    const response = await this.axiosInstance.post<T>(url, data, config);
    return response.data;
  }

  /**
   * PUT method for updating data
   * @param endpoint API endpoint or complete URL
   * @param data Request body data
   * @param options Additional request options
   * @returns Promise with the response data
   */
  public async put<T>(endpoint: string, data: any, options: RequestOptions = {}): Promise<T> {
    const url = this.buildUrl(endpoint);
    const config: AxiosRequestConfig = {
      headers: options.headers,
      params: options.params,
      timeout: options.timeout,
    };
    
    const response = await this.axiosInstance.put<T>(url, data, config);
    return response.data;
  }

  /**
   * PATCH method for partial updates
   * @param endpoint API endpoint or complete URL
   * @param data Request body data
   * @param options Additional request options
   * @returns Promise with the response data
   */
  public async patch<T>(endpoint: string, data: any, options: RequestOptions = {}): Promise<T> {
    const url = this.buildUrl(endpoint);
    const config: AxiosRequestConfig = {
      headers: options.headers,
      params: options.params,
      timeout: options.timeout,
    };
    
    const response = await this.axiosInstance.patch<T>(url, data, config);
    return response.data;
  }

  /**
   * DELETE method for removing data
   * @param endpoint API endpoint or complete URL
   * @param data Optional request body data
   * @param options Additional request options
   * @returns Promise with the response data
   */
  public async delete<T>(endpoint: string, data?: any, options: RequestOptions = {}): Promise<T> {
    const url = this.buildUrl(endpoint);
    const config: AxiosRequestConfig = {
      headers: options.headers,
      params: options.params,
      timeout: options.timeout,
      data, // For DELETE with request body
    };
    
    const response = await this.axiosInstance.delete<T>(url, config);
    return response.data;
  }
}
