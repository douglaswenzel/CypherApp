import { useRouter } from 'expo-router';
import React, { useState } from 'react';
import { StyleSheet, View } from 'react-native';

import {
  Surface,
  Text,
  TextInput,
} from 'react-native-paper';


import { AppButton } from '../components/AppButton';
import { AppInput } from '../components/AppInput';
import { ErrorModal } from '../components/ErrorModal';

import { loginService } from '../services/auth.service';
import { COLORS } from '../theme/colors';

export default function LoginScreen() {
  const router = useRouter();

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const [showPassword, setShowPassword] =
    useState(false);

  const [modalVisible, setModalVisible] =
    useState(false);

  const [errorMessage, setErrorMessage] =
    useState('');

  const handleLogin = async () => {
    try {
      const response =
        await loginService({
          username,
          password,
        });

      console.log(response);

      router.replace('/encrypt');
    } catch (error: any) {
      setErrorMessage(
        error?.response?.data?.error ||
          'Erro ao realizar login.'
      );

      setModalVisible(true);
    }
  };

  return (
    <View style={styles.container}>
      <Surface style={styles.card} elevation={2}>
        <Text
          variant="headlineMedium"
          style={styles.title}
        >
          CypherApp
        </Text>

        <Text
          variant="bodyMedium"
          style={styles.subtitle}
        >
          Fatec Votorantim
        </Text>

        <AppInput
          label="Usuário"
          value={username}
          onChangeText={setUsername}
          left={
            <TextInput.Icon icon="account" />
          }
        />

        <AppInput
          label="Senha"
          secureTextEntry={!showPassword}
          value={password}
          onChangeText={setPassword}
          left={
            <TextInput.Icon icon="lock" />
          }
          right={
            <TextInput.Icon
              icon={
                showPassword
                  ? 'eye-off'
                  : 'eye'
              }
              onPress={() =>
                setShowPassword(
                  !showPassword
                )
              }
            />
          }
        />

        <AppButton
          onPress={handleLogin}
          disabled={!username || !password}
        >
          Entrar
        </AppButton>
      </Surface>

      <ErrorModal
        visible={modalVisible}
        message={errorMessage}
        onClose={() =>
          setModalVisible(false)
        }
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,

    justifyContent: 'center',
    alignItems: 'center',

    backgroundColor: COLORS.background,

    padding: 24,
  },

  card: {
    width: '100%',
    maxWidth: 420,

    padding: 28,

    borderRadius: 24,

    backgroundColor: COLORS.surface,

    borderWidth: 1,
    borderColor: COLORS.border,
  },

  title: {
    textAlign: 'center',

    color: COLORS.primary,

    fontWeight: '700',

    marginBottom: 8,

    letterSpacing: 1,
  },

  subtitle: {
    textAlign: 'center',

    color: COLORS.textSecondary,

    marginBottom: 32,

    lineHeight: 22,
  },
});