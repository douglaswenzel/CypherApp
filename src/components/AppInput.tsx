import React from 'react';
import {
    TextInput,
    TextInputProps,
} from 'react-native-paper';

export function AppInput(props: TextInputProps) {
  return (
    <TextInput
      mode="flat"
      textColor="#F5F7F5"
      placeholderTextColor="#B7C4BA"
      style={{
        marginBottom: 14,
        backgroundColor: '#203126',
      }}
      theme={{
        roundness: 14,
      }}
      {...props}
    />
  );
}