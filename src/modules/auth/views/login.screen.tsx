import React, { useState } from 'react';
import { Image, ScrollView, Text, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useLogin } from '../view-models/auth.view-model';
import { FormButton } from './components/FormButton';
import { FormInput } from './components/FormInput';
import { loginStyles } from '../styles/login.style';
import { router } from 'expo-router'; // Importado para uso futuro

export const LoginScreen = () => {
  // Estado del formulario
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  // ViewModel para login
  const { login, isLoading, formErrors, clearErrors } = useLogin();

  // Manejar envío del formulario
  const handleSubmit = () => {
    clearErrors();
    login({ email, password });
  };

  // Validar formulario
  const isFormValid = email.trim() !== '' && password.trim() !== '';

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <ScrollView contentContainerStyle={loginStyles.container} keyboardShouldPersistTaps="handled">
        <View style={loginStyles.logoContainer}>
          <Image source={require('../../../../assets/images/icon.png')} style={loginStyles.logo} />
        </View>

        <Text style={loginStyles.title}>Iniciar Sesión</Text>

        {/* Mensaje de error general */}
        {formErrors.general && <Text style={loginStyles.errorText}>{formErrors.general}</Text>}

        {/* Campo de email */}
        <FormInput
          label="Correo electrónico"
          placeholder="Ingresa tu correo electrónico"
          keyboardType="email-address"
          autoCapitalize="none"
          value={email}
          onChangeText={setEmail}
          error={formErrors.email}
        />

        {/* Campo de contraseña */}
        <FormInput
          label="Contraseña"
          placeholder="Ingresa tu contraseña"
          secureTextEntry
          value={password}
          onChangeText={setPassword}
          error={formErrors.password}
        />

        {/* Enlace para recuperar contraseña */}
        <TouchableOpacity
          style={loginStyles.forgotPassword}
          onPress={() => {
            // Comentado hasta implementar la recuperación de contraseña
            // router.push('/auth/forgot-password');
            console.log('Recuperación de contraseña no implementada aún');
          }}
        >
          <Text style={loginStyles.forgotPasswordText}>¿Olvidaste tu contraseña?</Text>
        </TouchableOpacity>

        {/* Botón de login */}
        <FormButton
          title="Iniciar Sesión"
          onPress={handleSubmit}
          disabled={!isFormValid}
          isLoading={isLoading}
        />

        {/* Enlace para registrarse */}
        <View style={loginStyles.footer}>
          <Text style={loginStyles.footerText}>¿No tienes una cuenta?</Text>
          <TouchableOpacity
            onPress={() => {
              router.push('/(auth)/register');
            }}
          >
            <Text style={loginStyles.footerLink}>Regístrate</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};
