import React, { useState } from 'react';
import { View, StyleSheet } from 'react-native';
import { UserList } from '../../src/modules/example/views/user.list';
import { UserDetail } from '../../src/modules/example/views/user.detail';

export default function UsersScreen() {
  const [selectedUserId, setSelectedUserId] = useState<number | null>(null);

  // Función para seleccionar un usuario
  const handleSelectUser = (userId: number) => {
    setSelectedUserId(userId);
  };

  // Función para volver a la lista
  const handleBack = () => {
    setSelectedUserId(null);
  };

  return (
    <View style={styles.container}>
      {selectedUserId ? (
        <UserDetail userId={selectedUserId} onBack={handleBack} />
      ) : (
        <UserList onSelectUser={handleSelectUser} />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
    paddingTop: 50,
  },
});
