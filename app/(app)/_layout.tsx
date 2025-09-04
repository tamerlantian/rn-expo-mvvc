import { useAuth } from '@/src/modules/auth/views/AuthProvider';
import { Stack, useRouter } from 'expo-router';
import { useEffect } from 'react';

export default function AppLayout() {
  const { isAuthenticated } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!isAuthenticated) {
      router.replace('/(auth)/login');
    }
  }, [isAuthenticated, router]);

  return (
    <Stack screenOptions={{ headerShown: false }}>
      <Stack.Screen name="(tabs)" />
    </Stack>
  );
}
