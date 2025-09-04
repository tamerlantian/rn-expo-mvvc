import { useAuth } from '@/src/modules/auth/views/AuthProvider';
import { Stack, useRouter } from 'expo-router';
import { useEffect, useState } from 'react';
import { View, ActivityIndicator } from 'react-native';

export default function AppLayout() {
  const { isAuthenticated, loading } = useAuth();
  const router = useRouter();
  const [isCheckingAuth, setIsCheckingAuth] = useState(true);

  useEffect(() => {
    // Only proceed when the auth state is no longer loading
    if (!loading) {
      if (!isAuthenticated) {
        // If not authenticated, redirect to login
        router.replace('/(auth)/login');
      }
      // Auth check completed
      setIsCheckingAuth(false);
    }
  }, [isAuthenticated, loading, router]);

  // Show loading indicator while checking authentication
  if (loading || isCheckingAuth) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <ActivityIndicator size="large" color="#0000ff" />
      </View>
    );
  }

  // Only render the protected content if authenticated
  if (!isAuthenticated) {
    return null; // Don't render anything while redirecting
  }

  return (
    <Stack screenOptions={{ headerShown: false }}>
      <Stack.Screen name="(tabs)" />
    </Stack>
  );
}
