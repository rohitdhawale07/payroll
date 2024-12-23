import js from '@eslint/js';
import globals from 'globals';
import reactHooks from 'eslint-plugin-react-hooks';
import reactRefresh from 'eslint-plugin-react-refresh';
import react from 'eslint-plugin-react';

export default {
  ignores: ['dist'], // Ignore the "dist" folder
  extends: [
    js.configs.recommended, // Use recommended JavaScript rules
    'plugin:prettier/recommended', // Add Prettier for consistent formatting
  ],
  files: ['**/*.{js,jsx}'], // Target .js and .jsx files
  languageOptions: {
    ecmaVersion: 2020, // ECMAScript 2020 support
    globals: {
      ...globals.browser, // Define browser globals
      define: 'readonly', // Add Vite global for define
    },
  },
  plugins: {
    'react-hooks': reactHooks, // Enable React Hooks plugin
    'react-refresh': reactRefresh, // Enable React Refresh plugin
    react, // Enable React plugin
  },
  rules: {
    ...reactHooks.configs.recommended.rules, // Use recommended rules for React Hooks
    'react-refresh/only-export-components': [
      'warn',
      { allowConstantExport: true },
    ],
    'react/jsx-uses-react': 'off', // Disable for new JSX runtime
    'react/react-in-jsx-scope': 'off', // Disable for new JSX runtime
  },
};
