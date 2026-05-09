import { useRouter } from 'expo-router';
import React, { useState } from 'react';
import { ScrollView, StyleSheet } from 'react-native';
import { Button, Card, HelperText, Surface, Text, TextInput } from 'react-native-paper';
import { ErrorModal } from '../components/ErrorModal';
import database from '../database/database.json';

interface HashEntry {
  hash: string;
  step: number;
  used: boolean;
}

interface DatabaseType {
  hashes: HashEntry[];
  users: any[];
}

export default function DecryptScreen() {
  const [encryptedMessage, setEncryptedMessage] = useState('');
  const [hashInput, setHashInput] = useState('');
  const [decryptedText, setDecryptedText] = useState('');
  const [modalVisible, setModalVisible] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const router = useRouter();

  const handleDecrypt = () => {
    const db = database as DatabaseType;

    const hashData = db.hashes.find(
      h => h.hash === hashInput.toUpperCase()
    );

    if (!hashData) {
      setErrorMessage('Chave (Hash) não encontrada no sistema.');
      setModalVisible(true);
      return;
    }

    if (hashData.used) {
      setErrorMessage('Este hash já foi utilizado e não é mais válido.');
      setModalVisible(true);
      return;
    }

    const shift = hashData.step * -1;
    const alphabet = 'abcdefghijklmnopqrstuvwxyz0123456789'.split('');

    const decrypted = encryptedMessage
      .toLowerCase()
      .split('')
      .map(char => {
        const index = alphabet.indexOf(char);

        if (index === -1) return char;

        let newIndex = (index + shift) % alphabet.length;

        if (newIndex < 0) {
          newIndex += alphabet.length;
        }

        return alphabet[newIndex];
      })
      .join('');

    hashData.used = true;

    setDecryptedText(decrypted);
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Surface style={styles.card} elevation={1}>
        <Text variant="headlineSmall" style={styles.title}>
          Descriptografar
        </Text>

        <TextInput
          label="Mensagem Criptografada"
          mode="outlined"
          value={encryptedMessage}
          onChangeText={setEncryptedMessage}
          style={styles.input}
        />

        <TextInput
          label="Hash (Chave Privada)"
          mode="outlined"
          value={hashInput}
          onChangeText={setHashInput}
          style={styles.input}
          left={<TextInput.Icon icon="key" />}
        />

        <Button
          mode="contained"
          onPress={handleDecrypt}
          style={[styles.button, { backgroundColor: '#43A047' }]}
          disabled={!encryptedMessage || !hashInput}
        >
          Revelar Mensagem Original
        </Button>
      </Surface>

      {decryptedText ? (
        <Card style={styles.resultCard}>
          <Card.Content>
            <Text variant="labelLarge" style={{ color: '#2e7d32' }}>
              Texto Original:
            </Text>

            <Text variant="headlineSmall" style={styles.decryptedText}>
              {decryptedText}
            </Text>

            <HelperText type="info">
              Esta chave foi invalidada e não poderá ser usada novamente.
            </HelperText>
          </Card.Content>
        </Card>
      ) : null}

      <ErrorModal
        visible={modalVisible}
        message={errorMessage}
        onClose={() => setModalVisible(false)}
      />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    padding: 24,
    backgroundColor: '#0F1A14',
    alignItems: 'center',
  },

  card: {
    width: '100%',
    maxWidth: 520,
    padding: 24,
    borderRadius: 24,
    backgroundColor: '#17241C',
    borderWidth: 1,
    borderColor: '#2D4635',
  },

  title: {
    marginBottom: 24,
    textAlign: 'center',
    fontWeight: '700',
    color: '#5DBB63',
    letterSpacing: 0.5,
  },

  input: {
    marginBottom: 12,
    width: '100%',
    backgroundColor: '#203126',
  },

  button: {
    marginTop: 18,
    width: '100%',
    borderRadius: 14,
  },

  resultCard: {
    width: '100%',
    maxWidth: 520,
    marginTop: 24,
    backgroundColor: '#163222',
    borderLeftWidth: 4,
    borderLeftColor: '#5DBB63',
    borderRadius: 22,
    borderWidth: 1,
    borderColor: '#2D4635',
  },

  decryptedText: {
    fontWeight: '700',
    marginTop: 12,
    color: '#F5F7F5',
  },
});