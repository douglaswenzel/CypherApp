import { api } from './api';

interface EncryptData {
  message: string;
  step: number;
}

interface EncryptResponse {
  encryptedText: string;
  hash: string;
}

export async function encryptService(
  data: EncryptData
): Promise<EncryptResponse> {
  const response = await api.post(
    '/encrypt',
    data
  );

  return response.data;
}