import React, { useRef, useState } from 'react';
import { View, StyleSheet, TouchableOpacity, Text, SafeAreaView } from 'react-native';
import { UserList } from '@/src/modules/example/views/user.list';
import { UserDetail } from '@/src/modules/example/views/user.detail';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { StatusBar } from 'expo-status-bar';
import UserFormSheet, { UserFormSheetRef } from '@/src/modules/example/views/user-form-sheet';

export default function UsersScreen() {
  const [selectedUserId, setSelectedUserId] = useState<number | null>(null);
  const userFormRef = useRef<UserFormSheetRef>(null);

  // Función para seleccionar un usuario
  const handleSelectUser = (userId: number) => {
    setSelectedUserId(userId);
  };

  // Función para volver a la lista
  const handleBack = () => {
    setSelectedUserId(null);
  };

  // Función para abrir el formulario
  const handleOpenForm = () => {
    userFormRef.current?.open();
  };

  // Función para manejar el éxito al crear un usuario
  const handleSuccess = () => {
    // Opcional: Mostrar un mensaje de éxito o realizar alguna acción
    console.log('Usuario creado con éxito');
  };

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <SafeAreaView style={{ flex: 1 }}>
        <StatusBar style="auto" />
        <View style={styles.container}>
          <View style={styles.header}>
            <Text style={styles.headerTitle}>
              {selectedUserId ? 'Detalle de Usuario' : 'Lista de Usuarios'}
            </Text>
          </View>

          {selectedUserId ? (
            <UserDetail userId={selectedUserId} onBack={handleBack} />
          ) : (
            <>
              <UserList onSelectUser={handleSelectUser} />
              <TouchableOpacity style={styles.fab} onPress={handleOpenForm} activeOpacity={0.8}>
                <Text style={styles.fabText}>+</Text>
              </TouchableOpacity>
            </>
          )}

          {/* Bottom Sheet para crear usuarios */}
          <UserFormSheet ref={userFormRef} onSuccess={handleSuccess} />
        </View>
      </SafeAreaView>
    </GestureHandlerRootView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  header: {
    backgroundColor: '#1890ff',
    paddingVertical: 16,
    paddingHorizontal: 20,
    marginBottom: 16,
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: 'white',
    textAlign: 'center',
  },
  fab: {
    position: 'absolute',
    bottom: 24,
    right: 24,
    width: 56,
    height: 56,
    borderRadius: 28,
    backgroundColor: '#1890ff',
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 5,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
  },
  fabText: {
    fontSize: 24,
    color: 'white',
    fontWeight: 'bold',
  },
});
