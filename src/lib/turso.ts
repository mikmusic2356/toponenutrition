import { createClient } from '@libsql/client/web';

const getEnvVar = (viteKey: string, nodeKey: string, fallback: string): string => {
  try {
    if (typeof import.meta !== 'undefined' && (import.meta as any).env && (import.meta as any).env[viteKey]) {
      return (import.meta as any).env[viteKey];
    }
  } catch (e) {
    // Ignore error in non-Vite contexts
  }

  try {
    if (typeof process !== 'undefined' && process.env && process.env[nodeKey]) {
      return process.env[nodeKey] as string;
    }
  } catch (e) {
    // Ignore error in non-Node contexts
  }

  return fallback;
};

const TURSO_URL = getEnvVar(
  'VITE_TURSO_DATABASE_URL',
  'TURSO_DATABASE_URL',
  ''
);

const TURSO_TOKEN = getEnvVar(
  'VITE_TURSO_AUTH_TOKEN',
  'TURSO_AUTH_TOKEN',
  ''
);

export const turso = createClient({
  url: TURSO_URL,
  authToken: TURSO_TOKEN,
});
