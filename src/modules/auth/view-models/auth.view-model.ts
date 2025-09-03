import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { authController } from '../controllers/auth.controller';
import { AuthState, LoginCredentials, RegisterCredentials } from '../models/Auth';
import { useToast } from '@/src/shared/hooks/use-toast.hook';
import { ApiErrorResponse } from '@/src/core/interfaces/api.interface';
import { useRouter } from 'expo-router';

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
  const router = useRouter();

  const loginMutation = useMutation({
    mutationFn: (credentials: LoginCredentials) => authController.login(credentials),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: authKeys.session() });
      queryClient.invalidateQueries({ queryKey: authKeys.user() });
      router.replace('/(app)/(tabs)');
      toast.success('Inicio de sesión exitoso');
    },
    onError: (error: any) => {
      const errorData = error as ApiErrorResponse;
      toast.error(errorData?.mensaje || 'Error al iniciar sesión');
    },
  });

  return {
    login: loginMutation.mutate,
    isLoading: loginMutation.isPending,
    isError: loginMutation.isError,
    error: loginMutation.error,
  };
};

// Hook para manejar el registro
export const useRegister = () => {
  const queryClient = useQueryClient();
  const toast = useToast();

  const registerMutation = useMutation({
    mutationFn: (userData: RegisterCredentials) => authController.register(userData),
    onSuccess: () => {
      // Actualizar el estado de autenticación y usuario
      queryClient.invalidateQueries({ queryKey: authKeys.session() });
      queryClient.invalidateQueries({ queryKey: authKeys.user() });
    },
    onError: (error: any) => {
      // Manejar errores de validación
      const errorData = error as ApiErrorResponse;
      toast.error(errorData?.mensaje || 'Error al iniciar sesión');
    },
  });

  return {
    register: registerMutation.mutate,
    isLoading: registerMutation.isPending,
    isError: registerMutation.isError,
    error: registerMutation.error,
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
