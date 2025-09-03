import React from 'react';
import { Image, ScrollView, Text, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useLogin } from '../view-models/auth.view-model';
import { FormButton } from './components/FormButton';
import { FormInputController } from './components/FormInputController';
import { loginStyles } from '../styles/login.style';
import { router } from 'expo-router';
import { useForm } from 'react-hook-form';

// Definir tipo para el formulario
type LoginFormValues = {
  email: string;
  password: string;
};

export const LoginScreen = () => {
  // ViewModel para login
  const { login, isLoading, formErrors, clearErrors } = useLogin();

  // Configurar React Hook Form
  const {
    control,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm<LoginFormValues>({
    defaultValues: {
      email: '',
      password: '',
    },
    mode: 'onChange',
  });

  // Manejar envío del formulario
  const onSubmit = (data: LoginFormValues) => {
    clearErrors();
    login(data);
  };

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <ScrollView contentContainerStyle={loginStyles.container} keyboardShouldPersistTaps="handled">
        <View style={loginStyles.logoContainer}>
          <Image source={require('../../../../assets/images/icon.png')} style={loginStyles.logo} />
        </View>

        <Text style={loginStyles.title}>Iniciar Sesión</Text>

        {/* Mensaje de error general */}
        {formErrors.general && <Text style={loginStyles.errorText}>{formErrors.general}</Text>}

        {/* Mostrar errores del backend si existen */}
        {formErrors.email && !errors.email && (
          <Text style={loginStyles.errorText}>{formErrors.email}</Text>
        )}
        {formErrors.password && !errors.password && (
          <Text style={loginStyles.errorText}>{formErrors.password}</Text>
        )}

        {/* Campo de email */}
        <FormInputController<LoginFormValues>
          control={control}
          name="email"
          label="Correo electrónico"
          placeholder="Ingresa tu correo electrónico"
          keyboardType="email-address"
          autoCapitalize="none"
          error={errors.email}
          rules={{
            required: 'El correo electrónico es obligatorio',
            pattern: {
              value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
              message: 'Correo electrónico inválido',
            },
          }}
        />

        {/* Campo de contraseña */}
        <FormInputController<LoginFormValues>
          control={control}
          name="password"
          label="Contraseña"
          placeholder="Ingresa tu contraseña"
          secureTextEntry
          error={errors.password}
          rules={{
            required: 'La contraseña es obligatoria',
            minLength: {
              value: 6,
              message: 'La contraseña debe tener al menos 6 caracteres',
            },
          }}
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
          onPress={handleSubmit(onSubmit)}
          disabled={!isValid}
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
