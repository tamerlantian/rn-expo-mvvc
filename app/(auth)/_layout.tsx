import { Stack } from 'expo-router';
import React from 'react';

export default function AuthLayout() {
  return (
    <Stack>
      <Stack.Screen
        name="login"
        options={{
          headerShown: false,
          title: 'Iniciar Sesión',
        }}
      />
      <Stack.Screen
        name="register"
        options={{
          headerShown: false,
          title: 'Crear Cuenta',
        }}
      />
    </Stack>
  );
}
