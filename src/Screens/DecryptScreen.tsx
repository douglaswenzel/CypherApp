import { useRouter } from "expo-router";
import { ScrollView, StyleSheet, View } from "react-native";
import { Button, Card, Surface, Text, TextInput } from "react-native-paper";

import { useDecryptStore } from "../store/cypher.store";

export default function DecryptScreen() {
  const {
    encryptedText,
    hash,
    decryptedText,
    isLoading,
    error,
    setEncryptedText,
    setHash,
    decrypt,
  } = useDecryptStore();

  const router = useRouter();

  const handleDecrypt = async () => {
    try {
      await decrypt();
    } catch {
      // erro já está no store via `error`
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Surface style={styles.card} elevation={1}>
        <Text variant="headlineSmall" style={styles.title}>
          Descriptografar Mensagem
        </Text>

        <TextInput
          label="Mensagem Criptografada"
          mode="outlined"
          multiline
          numberOfLines={4}
          value={encryptedText}
          onChangeText={setEncryptedText}
          style={styles.input}
          placeholder="Cole aqui a mensagem criptografada"
        />

        <TextInput
          label="Hash"
          mode="outlined"
          value={hash}
          onChangeText={setHash}
          style={styles.input}
          placeholder="Digite o hash gerado"
          autoCapitalize="characters"
        />

        <Button
          mode="contained"
          onPress={handleDecrypt}
          style={styles.button}
          disabled={!encryptedText || !hash || isLoading}
          loading={isLoading}
        >
          Descriptografar
        </Button>
      </Surface>

      {error ? <Text style={styles.errorText}>{error}</Text> : null}

      {decryptedText ? (
        <Card style={styles.resultCard}>
          <Card.Content>
            <Text variant="labelLarge">Mensagem Descriptografada:</Text>

            <Text style={styles.resultText}>{decryptedText}</Text>
          </Card.Content>
        </Card>
      ) : null}

      <View style={styles.footer}>
        <Button mode="text" onPress={() => router.push("/encrypt")}>
          Ir para Criptografia
        </Button>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    padding: 24,
    backgroundColor: "#0F1A14",
    alignItems: "center",
  },

  card: {
    width: "100%",
    maxWidth: 520,
    padding: 24,
    borderRadius: 24,
    backgroundColor: "#17241C",
    borderWidth: 1,
    borderColor: "#2D4635",
  },

  title: {
    marginBottom: 24,
    textAlign: "center",
    fontWeight: "700",
    color: "#5DBB63",
    letterSpacing: 0.5,
  },

  input: {
    marginBottom: 16,
    backgroundColor: "#203126",
  },

  button: {
    marginTop: 12,
    borderRadius: 14,
    backgroundColor: "#5DBB63",
  },

  resultCard: {
    width: "100%",
    maxWidth: 520,
    marginTop: 24,
    backgroundColor: "#163222",
    borderRadius: 22,
    borderLeftWidth: 4,
    borderLeftColor: "#5DBB63",
    borderWidth: 1,
    borderColor: "#2D4635",
  },

  resultText: {
    marginTop: 12,
    fontSize: 16,
    color: "#fff",
    backgroundColor: "#203126",
    padding: 14,
    borderRadius: 10,
    lineHeight: 24,
  },

  errorText: {
    color: "#ff6b6b",
    marginTop: 20,
    textAlign: "center",
    fontWeight: "600",
    fontSize: 15,
  },

  footer: {
    marginTop: 24,
  },
});
