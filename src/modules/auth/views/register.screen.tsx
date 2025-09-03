import { router } from 'expo-router';
import React, { useState } from 'react';
import { Image, ScrollView, Text, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { FormButton } from '../../../shared/components/ui/button/FormButton';
import { FormInput } from '../../../shared/components/ui/form/FormInput';
import { loginStyles } from '../styles/login.style';
import { useRegister } from '../view-models/auth.view-model';

export const RegisterScreen = () => {
  // Estado del formulario
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  // Estado para errores de validación local
  const [localErrors, setLocalErrors] = useState<Record<string, string>>({});
  // ViewModel para registro
  const { register, isLoading, formErrors, clearErrors } = useRegister();

  // Validar formulario localmente
  const validateForm = () => {
    const errors: Record<string, string> = {};

    if (!name.trim()) {
      errors.name = 'El nombre es obligatorio';
    }

    if (!email.trim()) {
      errors.email = 'El correo electrónico es obligatorio';
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      errors.email = 'Ingresa un correo electrónico válido';
    }

    if (!password) {
      errors.password = 'La contraseña es obligatoria';
    } else if (password.length < 6) {
      errors.password = 'La contraseña debe tener al menos 6 caracteres';
    }

    if (password !== confirmPassword) {
      errors.confirmPassword = 'Las contraseñas no coinciden';
    }

    setLocalErrors(errors);
    return Object.keys(errors).length === 0;
  };

  // Manejar envío del formulario
  const handleSubmit = () => {
    clearErrors();

    if (validateForm()) {
      register({ name, email, password });
    }
  };

  // Combinar errores locales y del servidor
  const allErrors = { ...localErrors, ...formErrors };

  // Validar formulario para habilitar/deshabilitar botón
  const isFormValid =
    name.trim() !== '' &&
    email.trim() !== '' &&
    password.trim() !== '' &&
    confirmPassword.trim() !== '';

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <ScrollView contentContainerStyle={loginStyles.container} keyboardShouldPersistTaps="handled">
        <View style={loginStyles.logoContainer}>
          <Image source={require('../../../../assets/images/icon.png')} style={loginStyles.logo} />
        </View>

        <Text style={loginStyles.title}>Crear Cuenta</Text>

        {/* Mensaje de error general */}
        {allErrors.general && <Text style={loginStyles.errorText}>{allErrors.general}</Text>}

        {/* Campo de nombre */}
        <FormInput
          label="Nombre completo"
          placeholder="Ingresa tu nombre"
          autoCapitalize="words"
          value={name}
          onChangeText={setName}
          error={allErrors.name}
        />

        {/* Campo de email */}
        <FormInput
          label="Correo electrónico"
          placeholder="Ingresa tu correo electrónico"
          keyboardType="email-address"
          autoCapitalize="none"
          value={email}
          onChangeText={setEmail}
          error={allErrors.email}
        />

        {/* Campo de contraseña */}
        <FormInput
          label="Contraseña"
          placeholder="Crea una contraseña"
          secureTextEntry
          value={password}
          onChangeText={setPassword}
          error={allErrors.password}
        />

        {/* Campo de confirmar contraseña */}
        <FormInput
          label="Confirmar contraseña"
          placeholder="Confirma tu contraseña"
          secureTextEntry
          value={confirmPassword}
          onChangeText={setConfirmPassword}
          error={allErrors.confirmPassword}
        />

        {/* Botón de registro */}
        <FormButton
          title="Registrarse"
          onPress={handleSubmit}
          disabled={!isFormValid}
          isLoading={isLoading}
        />

        {/* Enlace para iniciar sesión */}
        <View style={loginStyles.footer}>
          <Text style={loginStyles.footerText}>¿Ya tienes una cuenta?</Text>
          <TouchableOpacity
            onPress={() => {
              router.push('/(auth)/login');
            }}
          >
            <Text style={loginStyles.footerLink}>Iniciar Sesión</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};
