export type EnvironmentConfig = {
  uiBaseUrl: string;
  apiBaseUrl: string;
  adminUsername: string;
  adminPassword: string;
};

export const env: EnvironmentConfig = {
  uiBaseUrl: process.env.UI_BASE_URL ?? 'https://automationintesting.online',
  apiBaseUrl: process.env.API_BASE_URL ?? 'https://restful-booker.herokuapp.com',
  adminUsername: process.env.ADMIN_USERNAME ?? 'admin',
  adminPassword: process.env.ADMIN_PASSWORD ?? 'password'
};
