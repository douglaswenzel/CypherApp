const BASE_URL = process.env.EXPO_PUBLIC_BASE_URL;

if (!BASE_URL) {
  throw new Error(
    "EXPO_PUBLIC_BASE_URL não está definida. Verifique o arquivo .env",
  );
}

export const config = {
  baseUrl: BASE_URL,
};
