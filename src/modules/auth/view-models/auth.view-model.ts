import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { useState } from 'react';
import { authController } from '../controllers/auth.controller';
import { AuthState, LoginCredentials } from '../models/Auth';
import { useToast } from '@/src/shared/hooks/use-toast.hook';

// Claves para las queries de React Query
export const authKeys = {
  all: ['auth'] as const,
  session: () => [...authKeys.all, 'session'] as const,
  user: () => [...authKeys.all, 'user'] as const,
};

// Hook para verificar el estado de autenticación
export const useAuthStatus = () => {
  return useQuery({
    queryKey: authKeys.session(),
    queryFn: authController.isAuthenticated,
    staleTime: 5 * 60 * 1000, // 5 minutos
  });
};

// Hook para obtener el usuario actual
export const useCurrentUser = () => {
  return useQuery({
    queryKey: authKeys.user(),
    queryFn: authController.getCurrentUser,
    staleTime: 5 * 60 * 1000, // 5 minutos
  });
};

// Hook para manejar el login
export const useLogin = () => {
  const queryClient = useQueryClient();
  const toast = useToast();
  const [formErrors, setFormErrors] = useState<Record<string, string>>({});

  const loginMutation = useMutation({
    mutationFn: (credentials: LoginCredentials) => authController.login(credentials),
    onSuccess: () => {
      // Actualizar el estado de autenticación y usuario
      queryClient.invalidateQueries({ queryKey: authKeys.session() });
      queryClient.invalidateQueries({ queryKey: authKeys.user() });
      setFormErrors({});
      toast.success('Inicio de sesión exitoso');
    },
    onError: (error: any) => {
      // Manejar errores de validación
      if (error.response?.status === 400 && error.response?.data?.validaciones) {
        const validationErrors: Record<string, string> = {};

        // Mapear errores de validación del backend a campos del formulario
        Object.entries(error.response.data.validaciones).forEach(([key, value]) => {
          validationErrors[key] = Array.isArray(value) ? value[0] : String(value);
        });

        setFormErrors(validationErrors);
      } else {
        // Error general
        setFormErrors({
          general: error.response?.data?.mensaje || 'Error al iniciar sesión',
        });
      }
    },
  });

  return {
    login: loginMutation.mutate,
    isLoading: loginMutation.isPending,
    isError: loginMutation.isError,
    error: loginMutation.error,
    formErrors,
    clearErrors: () => setFormErrors({}),
  };
};

// Hook para manejar el registro
export const useRegister = () => {
  const queryClient = useQueryClient();
  const [formErrors, setFormErrors] = useState<Record<string, string>>({});

  const registerMutation = useMutation({
    mutationFn: (userData: Omit<LoginCredentials, 'token'> & { name: string }) =>
      authController.register(userData),
    onSuccess: () => {
      // Actualizar el estado de autenticación y usuario
      queryClient.invalidateQueries({ queryKey: authKeys.session() });
      queryClient.invalidateQueries({ queryKey: authKeys.user() });
      setFormErrors({});
    },
    onError: (error: any) => {
      // Manejar errores de validación
      if (error.response?.status === 400 && error.response?.data?.validaciones) {
        const validationErrors: Record<string, string> = {};

        // Mapear errores de validación del backend a campos del formulario
        Object.entries(error.response.data.validaciones).forEach(([key, value]) => {
          validationErrors[key] = Array.isArray(value) ? value[0] : String(value);
        });

        setFormErrors(validationErrors);
      } else {
        // Error general
        setFormErrors({
          general: error.response?.data?.mensaje || 'Error al registrar usuario',
        });
      }
    },
  });

  return {
    register: registerMutation.mutate,
    isLoading: registerMutation.isPending,
    isError: registerMutation.isError,
    error: registerMutation.error,
    formErrors,
    clearErrors: () => setFormErrors({}),
  };
};

// Hook para manejar el logout
export const useLogout = () => {
  const queryClient = useQueryClient();

  const logoutMutation = useMutation({
    mutationFn: authController.logout,
    onSuccess: () => {
      // Limpiar el estado de autenticación y usuario
      queryClient.invalidateQueries({ queryKey: authKeys.session() });
      queryClient.invalidateQueries({ queryKey: authKeys.user() });
      queryClient.setQueryData(authKeys.session(), false);
      queryClient.setQueryData(authKeys.user(), null);
    },
  });

  return {
    logout: logoutMutation.mutate,
    isLoading: logoutMutation.isPending,
    isError: logoutMutation.isError,
    error: logoutMutation.error,
  };
};

// Hook para manejar el estado global de autenticación
export const useAuthState = (): AuthState => {
  const { data: isAuthenticated = false, isLoading: isAuthLoading } = useAuthStatus();
  const { data: user = null, isLoading: isUserLoading } = useCurrentUser();
  const { error } = useLogin();

  return {
    isAuthenticated,
    user,
    loading: isAuthLoading || isUserLoading,
    error: error ? (error as Error).message : null,
  };
};
