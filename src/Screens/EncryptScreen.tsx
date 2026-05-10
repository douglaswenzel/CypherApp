import * as Clipboard from 'expo-clipboard';
import { useRouter } from 'expo-router';
import React, { useState } from 'react';
import { ScrollView, StyleSheet, View } from 'react-native';

import {
  Button,
  Card,
  HelperText,
  IconButton,
  Surface,
  Text,
  TextInput,
} from 'react-native-paper';

import { encryptService } from '../services/encrypt.service';

export default function EncryptScreen() {
  const [message, setMessage] = useState('');
  const [step, setStep] = useState('');
  const [resultHash, setResultHash] =
    useState('');

  const [encryptedText, setEncryptedText] =
    useState('');

  const router = useRouter();

  const copyToClipboard = async (
    text: string
  ) => {
    await Clipboard.setStringAsync(text);
  };

  const handleEncrypt = async () => {
    try {
      if (!message.trim()) {
        alert('Digite uma mensagem');
        return;
      }

      if (step === '' || step === null || step === undefined) {
        alert('Digite um STEP válido');
        return;
      }

      const numericStep = Number(step);

      if (isNaN(numericStep)) {
        alert('O STEP precisa ser numérico');
        return;
      }

      const response = await encryptService({
        message,
        step: numericStep,
      });

      setEncryptedText(response.encryptedText);
      setResultHash(response.hash);

    } catch (error: any) {
      console.log(error?.response?.data);

      const backendMessage =
        error?.response?.data?.error ||
        error?.response?.data?.message;

      if (backendMessage) {
        alert(backendMessage);
      } else {
        alert('Erro ao criptografar');
      }
    }
  };

  return (
    <ScrollView
      contentContainerStyle={
        styles.container
      }
    >
      <Surface
        style={styles.card}
        elevation={1}
      >
        <Text
          variant="headlineSmall"
          style={styles.title}
        >
          Criptografar Mensagem
        </Text>

        <TextInput
          label="Mensagem Original"
          mode="outlined"
          multiline
          numberOfLines={4}
          value={message}
          onChangeText={setMessage}
          style={styles.input}
          placeholder="Digite o texto que deseja proteger"
          textColor="#F5F7F5"
          outlineColor="#2D4635"
          activeOutlineColor="#5DBB63"
          theme={{
            colors: {
              onSurfaceVariant:
                '#9FB5A3',
            },
          }}
        />

        <TextInput
          label="Passo (Deslocamento)"
          mode="outlined"
          keyboardType="numeric"
          value={step}
          onChangeText={setStep}
          style={styles.input}
          placeholder="Ex: 3 ou -3"
          textColor="#F5F7F5"
          outlineColor="#2D4635"
          activeOutlineColor="#5DBB63"
          theme={{
            colors: {
              onSurfaceVariant:
                '#9FB5A3',
            },
          }}
          left={
            <TextInput.Icon
              icon="numeric"
            />
          }
        />

        <HelperText
          type="info"
          style={styles.helper}
        >
          Número de casas para
          deslocar (a-z, 0-9).
        </HelperText>

        <Button
          mode="contained"
          onPress={handleEncrypt}
          style={styles.button}
          labelStyle={
            styles.buttonLabel
          }
          disabled={
            !message || !step
          }
        >
          Gerar Cifra e Hash
        </Button>
      </Surface>

      {resultHash ? (
        <Card style={styles.resultCard}>
          <Card.Content>
            <Text
              variant="labelLarge"
              style={
                styles.sectionTitle
              }
            >
              Mensagem
              Criptografada
            </Text>

            <View
              style={
                styles.copyContainer
              }
            >
              <Text
                style={styles.codeText}
              >
                {encryptedText}
              </Text>

              <IconButton
                icon="content-copy"
                size={20}
                iconColor="#B7E4C7"
                onPress={() =>
                  copyToClipboard(
                    encryptedText
                  )
                }
              />
            </View>

            <View
              style={styles.divider}
            />

            <Text
              variant="labelLarge"
              style={
                styles.hashLabel
              }
            >
              Chave Privada
            </Text>

            <View
              style={
                styles.copyContainer
              }
            >
              <Text
                style={styles.hashText}
              >
                {resultHash}
              </Text>

              <IconButton
                icon="content-copy"
                size={20}
                iconColor="#B7E4C7"
                onPress={() =>
                  copyToClipboard(
                    resultHash
                  )
                }
              />
            </View>

            <Text
              style={
                styles.warningText
              }
            >
              Guarde este hash.
              Ele poderá ser usado
              apenas uma vez.
            </Text>
          </Card.Content>
        </Card>
      ) : null}

      <Button
        mode="text"
        onPress={() =>
          router.push('/decrypt')
        }
        style={styles.link}
        labelStyle={styles.linkText}
      >
        Ir para Descriptografia
      </Button>
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

    marginBottom: 20,
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

    backgroundColor: '#203126',
  },

  helper: {
    color: '#9FB5A3',
  },

  button: {
    marginTop: 18,

    borderRadius: 14,

    backgroundColor: '#5DBB63',
  },

  buttonLabel: {
    color: '#081C15',

    fontWeight: '700',
  },

  resultCard: {
    width: '100%',

    maxWidth: 520,

    backgroundColor: '#163222',

    borderRadius: 22,

    borderLeftWidth: 4,

    borderLeftColor: '#5DBB63',

    borderWidth: 1,

    borderColor: '#2D4635',
  },

  sectionTitle: {
    color: '#B7E4C7',

    fontWeight: '700',

    marginBottom: 8,
  },

  hashLabel: {
    color: '#95D5B2',

    fontWeight: '700',

    marginBottom: 8,
  },

  copyContainer: {
    flexDirection: 'row',

    alignItems: 'center',

    justifyContent:
      'space-between',

    backgroundColor: '#1B4332',

    borderRadius: 14,

    paddingLeft: 16,

    marginTop: 8,

    marginBottom: 8,
  },

  divider: {
    height: 1,

    backgroundColor: '#2D4635',

    marginVertical: 18,
  },

  codeText: {
    flex: 1,

    color: '#F5F7F5',

    fontFamily: 'monospace',

    fontSize: 15,

    paddingVertical: 14,
  },

  hashText: {
    flex: 1,

    color: '#F1FAEE',

    fontWeight: '700',

    letterSpacing: 2,

    fontSize: 16,

    paddingVertical: 14,
  },

  warningText: {
    color: '#D8F3DC',

    marginTop: 12,

    opacity: 0.8,

    fontSize: 13,
  },

  link: {
    marginTop: 24,
  },

  linkText: {
    color: '#5DBB63',
  },
});