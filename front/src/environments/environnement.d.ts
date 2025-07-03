export interface Environment {
  production: boolean;
  weatherApiKey?: string;
  apiBaseUrl: string;
}

export const environment: Environment;
