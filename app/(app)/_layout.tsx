import { useAuth } from '@/src/modules/auth/views/AuthProvider';
import { View, ActivityIndicator, Text, TouchableOpacity } from 'react-native';
import { Drawer } from 'expo-router/drawer';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { DrawerContentScrollView, DrawerItemList } from '@react-navigation/drawer';

// Componente personalizado para el contenido del drawer
function CustomDrawerContent(props: any) {
  const { logout } = useAuth();

  const handleLogout = () => {
    logout();
  };

  return (
    <DrawerContentScrollView {...props}>
      <DrawerItemList {...props} />
      <TouchableOpacity
        style={{
          padding: 20,
          borderTopWidth: 1,
          borderTopColor: '#ccc',
          marginTop: 15,
        }}
        onPress={handleLogout}
      >
        <Text style={{ color: '#1890ff', fontSize: 16, fontWeight: 'bold' }}>Cerrar Sesión</Text>
      </TouchableOpacity>
    </DrawerContentScrollView>
  );
}

export default function AppLayout() {
  const { isAuthenticated, loading } = useAuth();

  // Show loading indicator while checking authentication
  if (loading) {
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
    <GestureHandlerRootView style={{ flex: 1 }}>
      <Drawer
        screenOptions={{
          headerShown: true,
          drawerType: 'front',
          drawerStyle: {
            width: '70%',
          },
        }}
        drawerContent={props => <CustomDrawerContent {...props} />}
      >
        <Drawer.Screen
          name="(tabs)"
          options={{
            drawerLabel: 'Dashboard',
            title: 'Dashboard',
            headerShown: true,
          }}
        />
      </Drawer>
    </GestureHandlerRootView>
  );
}
