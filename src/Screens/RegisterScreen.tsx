import { useRouter } from "expo-router";
import React, { useState } from "react";
import { StyleSheet, TouchableOpacity, View } from "react-native";

import { Surface, Text, TextInput } from "react-native-paper";

import { AppButton } from "../components/AppButton";
import { AppInput } from "../components/AppInput";
import { ErrorModal } from "../components/ErrorModal";

import { useAuthStore } from "../store/auth.store";
import { COLORS } from "../theme/colors";

export default function RegisterScreen() {
  const router = useRouter();
  const { register, isLoading, error: storeError, clearError } = useAuthStore();

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const [modalVisible, setModalVisible] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const isFormValid =
    username.trim().length > 0 &&
    password.length > 0 &&
    confirmPassword.length > 0;

  const handleRegister = async () => {
    if (password !== confirmPassword) {
      setErrorMessage("As senhas não coincidem.");
      setModalVisible(true);
      return;
    }

    if (password.length < 6) {
      setErrorMessage("A senha deve ter pelo menos 6 caracteres.");
      setModalVisible(true);
      return;
    }

    try {
      await register(username, password);
      router.replace("/login");
    } catch {
      setErrorMessage(storeError || "Erro ao realizar cadastro.");
      setModalVisible(true);
    }
  };

  return (
    <View style={styles.container}>
      <Surface style={styles.card} elevation={2}>
        <Text variant="headlineMedium" style={styles.title}>
          Criar Conta
        </Text>

        <Text variant="bodyMedium" style={styles.subtitle}>
          Preencha os dados para se cadastrar
        </Text>

        <AppInput
          label="Usuário"
          value={username}
          onChangeText={setUsername}
          autoCapitalize="none"
          left={<TextInput.Icon icon="account" />}
        />

        <AppInput
          label="Senha"
          secureTextEntry={!showPassword}
          value={password}
          onChangeText={setPassword}
          left={<TextInput.Icon icon="lock" />}
          right={
            <TextInput.Icon
              icon={showPassword ? "eye-off" : "eye"}
              onPress={() => setShowPassword(!showPassword)}
            />
          }
        />

        <AppInput
          label="Confirmar Senha"
          secureTextEntry={!showConfirmPassword}
          value={confirmPassword}
          onChangeText={setConfirmPassword}
          left={<TextInput.Icon icon="lock-check" />}
          right={
            <TextInput.Icon
              icon={showConfirmPassword ? "eye-off" : "eye"}
              onPress={() => setShowConfirmPassword(!showConfirmPassword)}
            />
          }
        />

        <AppButton onPress={handleRegister} disabled={!isFormValid}>
          Cadastrar
        </AppButton>

        <TouchableOpacity
          style={styles.loginLink}
          onPress={() => router.replace("/login")}
        >
          <Text style={styles.loginLinkText}>
            Já tem uma conta?{" "}
            <Text style={styles.loginLinkHighlight}>Entrar</Text>
          </Text>
        </TouchableOpacity>
      </Surface>

      <ErrorModal
        visible={modalVisible}
        message={errorMessage}
        onClose={() => setModalVisible(false)}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,

    justifyContent: "center",
    alignItems: "center",

    backgroundColor: COLORS.background,

    padding: 24,
  },

  card: {
    width: "100%",
    maxWidth: 420,

    padding: 28,

    borderRadius: 24,

    backgroundColor: COLORS.surface,

    borderWidth: 1,
    borderColor: COLORS.border,
  },

  title: {
    textAlign: "center",

    color: COLORS.primary,

    fontWeight: "700",

    marginBottom: 8,

    letterSpacing: 1,
  },

  subtitle: {
    textAlign: "center",

    color: COLORS.textSecondary,

    marginBottom: 32,

    lineHeight: 22,
  },

  loginLink: {
    marginTop: 20,
    alignItems: "center",
  },

  loginLinkText: {
    color: COLORS.textSecondary,
    fontSize: 14,
  },

  loginLinkHighlight: {
    color: COLORS.primary,
    fontWeight: "700",
  },
});
