import { useRouter } from 'expo-router';
import React, { useState } from 'react';
import { ScrollView, StyleSheet, View } from 'react-native';
import { Button, Card, HelperText, Surface, Text, TextInput } from 'react-native-paper';

export default function EncryptScreen() {
  const [message, setMessage] = useState('');
  const [step, setStep] = useState('');
  const [resultHash, setResultHash] = useState('');
  const [encryptedText, setEncryptedText] = useState('');
  
  const router = useRouter();

  const handleEncrypt = () => {
    if (!message || !step) return; 
    const shift = parseInt(step);
    const alphabet = "abcdefghijklmnopqrstuvwxyz0123456789".split("");
    
    let encrypted = message.toLowerCase().split("").map(char => {
      const index = alphabet.indexOf(char);
      if (index === -1) return char;
      let newIndex = (index + shift) % alphabet.length;
      if (newIndex < 0) newIndex += alphabet.length;
      return alphabet[newIndex];
    }).join("");

    const newHash = Math.random().toString(36).substring(2, 10).toUpperCase();
    
    setEncryptedText(encrypted);
    setResultHash(newHash);

    console.log(`Salvando no banco: Hash ${newHash} com passo ${shift}`);
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Surface style={styles.card} elevation={1}>
        <Text variant="headlineSmall" style={styles.title}>Criptografar Mensagem</Text>
        
        <TextInput
          label="Mensagem Original"
          mode="outlined"
          multiline
          numberOfLines={4}
          value={message}
          onChangeText={setMessage}
          style={styles.input}
          placeholder="Digite o texto que deseja proteger"
        />

        <TextInput
          label="Passo (Deslocamento)"
          mode="outlined"
          keyboardType="numeric"
          value={step}
          onChangeText={setStep}
          style={styles.input}
          placeholder="Ex: 3 ou -3"
          left={<TextInput.Icon icon="numeric" />}
        />
        <HelperText type="info">
          Número de casas para deslocar (a-z, 0-9).
        </HelperText>

        <Button 
          mode="contained" 
          onPress={handleEncrypt} 
          style={styles.button}
          disabled={!message || !step}
        >
          Gerar Cifra e Hash
        </Button>
      </Surface>

      {resultHash ? (
        <Card style={styles.resultCard}>
          <Card.Content>
            <Text variant="labelLarge">Mensagem Criptografada:</Text>
            <Text variant="bodyLarge" style={styles.codeText}>{encryptedText}</Text>
            
            <View style={styles.divider} />
            
            <Text variant="labelLarge" style={{ color: '#d32f2f' }}>Chave Privada (Hash):</Text>
            <Text variant="headlineSmall" style={styles.hashText}>{resultHash}</Text>
            <Text variant="bodySmall">Guarde este hash! Ele só poderá ser usado uma única vez[cite: 28, 48].</Text>
          </Card.Content>
        </Card>
      ) : null}

      <Button mode="text" onPress={() => router.push('/decrypt')} style={styles.link}>
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

  button: {
    marginTop: 18,
    borderRadius: 14,
    backgroundColor: '#5DBB63',
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

  divider: {
    height: 1,
    backgroundColor: '#2D4635',
    marginVertical: 18,
  },

  codeText: {
    fontFamily: 'monospace',
    backgroundColor: '#203126',
    color: '#F5F7F5',
    padding: 14,
    marginTop: 8,
    borderRadius: 10,
  },

  hashText: {
    fontWeight: '700',
    letterSpacing: 3,
    marginVertical: 8,
    color: '#5DBB63',
  },

  link: {
    marginTop: 24,
  },
});