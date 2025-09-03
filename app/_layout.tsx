import { Stack } from 'expo-router';
import { QueryClientProvider } from '@tanstack/react-query';
import { queryClient } from '../src/config/react.query';
import { AuthProvider } from '../src/modules/auth/views/AuthProvider';

export default function RootLayout() {
  return (
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <Stack>
          <Stack.Screen options={{ headerShown: false }} name="index" />
          <Stack.Screen options={{ headerShown: false }} name="(app)" />
          <Stack.Screen options={{ headerShown: false }} name="(auth)" />
        </Stack>
      </AuthProvider>
    </QueryClientProvider>
  );
}
