const { defineConfig } = require('cypress');
require('dotenv').config();

module.exports = defineConfig({
  e2e: {
    setupNodeEvents(on, config) {
      // implement node event listeners here
    },
    baseUrl: process.env.CYPRESS_E2E_DOMAIN,
    specPattern: 'src/tests/e2e/**/*.cy.{js,jsx,ts,tsx}',
    env: Object.entries(process.env).reduce((prevValue, [key, value]) => {
      return {
        ...prevValue,
        ...(key.includes('CYPRESS')
          ? { [key.replace('CYPRESS_', '')]: value }
          : {}),
      };
    }, {}),
  },
});
