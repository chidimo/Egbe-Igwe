module.exports = {
  env: {
    browser: true,
    es6: true,
    node: true,
  },
  settings: {
    react: {
      pragma: 'React',
      version: 'detect',
    },
  },
  extends: [
    'eslint:recommended',
    'plugin:react/recommended',
    'plugin:jest/recommended',
    'plugin:jest-dom/recommended',
  ],
  globals: {
    Atomics: 'readonly',
    SharedArrayBuffer: 'readonly',
  },
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
    },
    ecmaVersion: 2020,
    sourceType: 'module',
  },
  plugins: ['react', 'jest', 'testing-library'],
  rules: {
    indent: ['error', 2],
    'linebreak-style': ['error', 'unix'],
    quotes: ['error', 'single'],
    semi: ['error', 'always'],
    'no-console': 1,
    'object-curly-spacing': ['warn', 'always'],
    'array-bracket-spacing': ['warn', 'always'],
    'jest/no-disabled-tests': [0],
    'react/display-name': [0],
    'react/jsx-fragments': [0],
  },
};
