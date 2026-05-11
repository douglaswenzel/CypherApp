import { useRouter } from "expo-router";
import { useState } from "react";
import { StyleSheet, View } from "react-native";

import { Surface, Text, TextInput } from "react-native-paper";

import { AppButton } from "../components/AppButton";
import { AppInput } from "../components/AppInput";
import { ErrorModal } from "../components/ErrorModal";
import { useAuthStore } from "../store/auth.store";
import { COLORS } from "../theme/colors";

export default function LoginScreen() {
  const router = useRouter();
  const { login, isLoading, error, clearError } = useAuthStore();

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const [showPassword, setShowPassword] = useState(false);

  const handleLogin = async () => {
    try {
      await login(username, password);
      router.replace("/encrypt");
    } catch {
      // erro já está no store via `error`
    }
  };

  return (
    <View style={styles.container}>
      <Surface style={styles.card} elevation={2}>
        <Text variant="headlineMedium" style={styles.title}>
          CypherApp
        </Text>

        <Text variant="bodyMedium" style={styles.subtitle}>
          Fatec Votorantim
        </Text>

        <AppInput
          label="Usuário"
          value={username}
          onChangeText={setUsername}
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

        <AppButton
          onPress={handleLogin}
          disabled={!username || !password || isLoading}
          loading={isLoading}
        >
          Entrar
        </AppButton>
      </Surface>

      <ErrorModal
        visible={!!error}
        message={error ?? ""}
        onClose={clearError}
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
});
