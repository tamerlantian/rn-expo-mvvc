import axios from 'axios';
import { User } from '../models/User';

// Base URL para la API
const API_BASE_URL = 'https://jsonplaceholder.typicode.com';

// Controlador para manejar las operaciones relacionadas con usuarios
export const userController = {
  // Obtener todos los usuarios
  getUsers: async (): Promise<User[]> => {
    try {
      const response = await axios.get<User[]>(`${API_BASE_URL}/users`);
      return response.data;
    } catch (error) {
      console.error('Error fetching users:', error);
      throw error;
    }
  },

  // Obtener un usuario por ID
  getUserById: async (id: number): Promise<User> => {
    try {
      const response = await axios.get<User>(`${API_BASE_URL}/users/${id}`);
      return response.data;
    } catch (error) {
      console.error(`Error fetching user with id ${id}:`, error);
      throw error;
    }
  },

  // Crear un nuevo usuario
  createUser: async (userData: Omit<User, 'id'>): Promise<User> => {
    try {
      const response = await axios.post<User>(`${API_BASE_URL}/users`, userData);
      return response.data;
    } catch (error) {
      console.error('Error creating user:', error);
      throw error;
    }
  },

  // Actualizar un usuario existente
  updateUser: async (id: number, userData: Partial<User>): Promise<User> => {
    try {
      const response = await axios.put<User>(`${API_BASE_URL}/users/${id}`, userData);
      return response.data;
    } catch (error) {
      console.error(`Error updating user with id ${id}:`, error);
      throw error;
    }
  },

  // Eliminar un usuario
  deleteUser: async (id: number): Promise<boolean> => {
    try {
      await axios.delete(`${API_BASE_URL}/users/${id}`);
      return true;
    } catch (error) {
      console.error(`Error deleting user with id ${id}:`, error);
      throw error;
    }
  }
};
