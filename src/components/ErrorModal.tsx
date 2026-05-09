import React from 'react';
import { Dimensions, Modal, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

interface ErrorModalProps {
  visible: boolean;
  message: string;
  onClose: () => void;
}

export function ErrorModal({ visible, message, onClose }: ErrorModalProps) {
  return (
    <Modal
      animationType="fade"
      transparent={true}
      visible={visible}
      onRequestClose={onClose}
    >
      <View style={styles.overlay}>
        <View style={styles.modalContainer}>
          <Text style={styles.errorTitle}>Ops!</Text>
          <Text style={styles.errorMessage}>{message}</Text>
          
          <TouchableOpacity style={styles.button} onPress={onClose}>
            <Text style={styles.buttonText}>Tentar novamente</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.75)',
    justifyContent: 'center',
    alignItems: 'center',
  },

  modalContainer: {
    width: Dimensions.get('window').width * 0.82,
    backgroundColor: '#17241C',
    borderRadius: 24,
    padding: 28,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#2D4635',
  },

  errorTitle: {
    fontSize: 24,
    fontWeight: '700',
    color: '#D96C6C',
    marginBottom: 12,
  },

  errorMessage: {
    fontSize: 16,
    textAlign: 'center',
    color: '#F5F7F5',
    marginBottom: 24,
    lineHeight: 24,
  },

  button: {
    backgroundColor: '#5DBB63',
    paddingVertical: 14,
    paddingHorizontal: 32,
    borderRadius: 14,
  },

  buttonText: {
    color: '#0F1A14',
    fontWeight: '700',
    fontSize: 16,
  },
});