import { Stack } from 'expo-router';

export default function AppLayout() {
  //   const { isAuthenticated } = useAuth();

  //   useEffect(() => {
  //     if (!isAuthenticated) {
  //       router.replace("/(auth)/login");
  //     }
  //   }, [isAuthenticated]);

  return (
    <Stack screenOptions={{ headerShown: false }}>
      <Stack.Screen name="(tabs)" />
    </Stack>
  );
}
