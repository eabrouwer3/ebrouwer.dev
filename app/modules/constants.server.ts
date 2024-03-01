function getEnv(key: string): string | undefined {
  return process.env[key];
}

function getEnvOrThrow(key: string): string {
  const value = getEnv(key);
  if (!value) {
    throw new Error(`Missing environment variable ${key}`);
  }
  return value;
}

export const NODE_ENV = getEnv('NODE_ENV');
export const SESSION_SECRET = getEnvOrThrow('SESSION_SECRET');
export const ENCRYPTION_SECRET = getEnvOrThrow('ENCRYPTION_SECRET');
export const GCP_PROJECT_ID = getEnvOrThrow('GCP_PROJECT_ID');
export const GCP_CREDENTIALS = getEnvOrThrow('GCP_CREDENTIALS');
export const PORKBUN_API_KEY = getEnvOrThrow('PORKBUN_API_KEY');
export const PORKBUN_SECRET_API_KEY = getEnvOrThrow('PORKBUN_SECRET_API_KEY');