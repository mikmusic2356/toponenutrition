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
  'https://toponenutrition-mikmusic2356.aws-us-east-2.turso.io'
);

const TURSO_TOKEN = getEnvVar(
  'VITE_TURSO_AUTH_TOKEN',
  'TURSO_AUTH_TOKEN',
  'eyJhbGciOiJFZERTQSIsInR5cCI6IkpXVCJ9.eyJhIjoicnciLCJpYXQiOjE3OTIwMTU1ODIsImlkIjoiMDFhMTNjNzMtYWUwMS03OWZkLWE5OWUtNGM2ZTVmNjExYzg5Iiwia2lkIjoiT19jVUNRdEI2Y3hWTlBrSzJFZFJPTEI0ZUhqR2wweFEtNUlEUVNaSjBOUSIsInJpZCI6ImM2YjNjOWZiLTgzMzItNDI2NS05MzU0LTA1NWU4ZWRiMWM0MiJ9.W8HOiPbKauOePmY_j9DovV06vL95Hn5G0CzYxtC3Af0CiNfjD_gtdW20ONz_fd5HLUIi-EFJ2EWxnslurncFCA'
);

export const turso = createClient({
  url: TURSO_URL,
  authToken: TURSO_TOKEN,
});
