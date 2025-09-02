import { Text, View, StyleSheet, ScrollView } from "react-native";
import { StatusBar } from "expo-status-bar";

export default function Index() {
  return (
    <ScrollView style={styles.container}>
      <StatusBar style="auto" />
      <View style={styles.header}>
        <Text style={styles.title}>React Native MVVC Boilerplate</Text>
        <Text style={styles.subtitle}>Con React Query y Bottom Sheet</Text>
      </View>
      
      <View style={styles.card}>
        <Text style={styles.cardTitle}>Características</Text>
        <Text style={styles.cardText}>• Arquitectura MVVC</Text>
        <Text style={styles.cardText}>• React Query para gestión de estado</Text>
        <Text style={styles.cardText}>• Bottom Sheet para formularios</Text>
        <Text style={styles.cardText}>• Navegación por tabs</Text>
        <Text style={styles.cardText}>• TypeScript</Text>
      </View>
      
      <View style={styles.card}>
        <Text style={styles.cardTitle}>Instrucciones</Text>
        <Text style={styles.cardText}>Navega a la pestaña &quot;Users&quot; para ver la lista de usuarios y probar el bottom sheet para crear nuevos usuarios.</Text>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
    padding: 16,
  },
  header: {
    marginTop: 60,
    marginBottom: 30,
    alignItems: 'center',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 16,
    color: '#666',
  },
  card: {
    backgroundColor: 'white',
    borderRadius: 8,
    padding: 16,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.2,
    shadowRadius: 1.41,
    elevation: 2,
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#333',
    marginBottom: 12,
  },
  cardText: {
    fontSize: 16,
    color: '#666',
    marginBottom: 8,
    lineHeight: 22,
  },
});
