const env = {
  uiBaseUrl: process.env.UI_BASE_URL || 'https://automationintesting.online',
  apiBaseUrl: process.env.API_BASE_URL || 'https://restful-booker.herokuapp.com',
  adminUsername: process.env.ADMIN_USERNAME || 'admin',
  adminPassword: process.env.ADMIN_PASSWORD || 'password'
};

module.exports = { env };
