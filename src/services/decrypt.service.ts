import { api } from './api';

interface DecryptProps {
  encryptedText: string;
  hash: string;
}

export const decryptService = async ({
  encryptedText,
  hash,
}: DecryptProps) => {
  const response = await api.post(
    '/decrypt',
    {
      encryptedText,
      hash,
    }
  );

  return response.data;
};