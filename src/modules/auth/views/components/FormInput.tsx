import React from 'react';
import { Text, TextInput, TextInputProps, View } from 'react-native';
import { loginStyles } from '../../styles/login.style';

interface FormInputProps extends TextInputProps {
  label: string;
  error?: string;
}

export const FormInput = ({ label, error, ...props }: FormInputProps) => {
  return (
    <View style={loginStyles.inputContainer}>
      <Text style={loginStyles.inputLabel}>{label}</Text>
      <TextInput
        style={[loginStyles.input, error ? loginStyles.inputError : null]}
        placeholderTextColor="#999"
        {...props}
      />
      {error ? <Text style={loginStyles.errorText}>{error}</Text> : null}
    </View>
  );
};
