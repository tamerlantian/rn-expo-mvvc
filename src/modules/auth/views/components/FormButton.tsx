import React from 'react';
import { ActivityIndicator, Text, TouchableOpacity, TouchableOpacityProps } from 'react-native';
import { loginStyles } from '../../styles/login.style';

interface FormButtonProps extends TouchableOpacityProps {
  title: string;
  isLoading?: boolean;
}

export const FormButton = ({ title, isLoading, disabled, ...props }: FormButtonProps) => {
  const isDisabled = disabled || isLoading;

  return (
    <TouchableOpacity
      style={[loginStyles.button, isDisabled ? loginStyles.buttonDisabled : null]}
      disabled={isDisabled}
      {...props}
    >
      {isLoading ? (
        <ActivityIndicator size="small" color="#fff" />
      ) : (
        <Text style={loginStyles.buttonText}>{title}</Text>
      )}
    </TouchableOpacity>
  );
};
