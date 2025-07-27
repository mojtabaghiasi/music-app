declare namespace NodeJS {
  export interface ProcessEnv {
    NODE_ENV: 'development' | 'production' | 'test';
    PORT?: string;
    JWT_SECRET: string;
    // Add other environment variables here as needed
  }
}
