export interface DatabaseConfig {
  url: string;
}

export interface AppConfig {
  nodeEnv: string;
  port: number;
  apiUrl: string;
  jwtSecret: string;
  database: DatabaseConfig;
}

export default () => {
  const databaseUrl = process.env.DATABASE_URL;
  const port = process.env.PORT;
  const jwtSecret = process.env.JWT_SECRET;
  const apiUrl = process.env.API_URL;

  if (!databaseUrl) {
    throw new Error('DATABASE_URL is not defined');
  }
  if (!port) {
    throw new Error('PORT is not defined');
  }
  if (!jwtSecret) {
    throw new Error('JWT_SECRET is not defined');
  }

  return {
    nodeEnv: process.env.NODE_ENV || 'development',
    port: parseInt(port, 10) || 3000,
    apiUrl: apiUrl || '',
    jwtSecret: jwtSecret || '',
    database: {
      url: databaseUrl,
    },
  };
};
