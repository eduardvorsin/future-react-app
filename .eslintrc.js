module.exports = {
  env: {
    browser: true,
    es2021: true,
    jest: true
  },
  parser: '@typescript-eslint/parser',

  extends: [
    'airbnb-base',
    'plugin:jest/recommended',
    'plugin:import/recommended',
    'plugin:react/recommended',
    'plugin:@typescript-eslint/eslint-recommended', 'plugin:@typescript-eslint/recommended',
    'plugin:storybook/recommended'
  ],

  parserOptions: {
    ecmaVersion: 'latest',
    ecmaFeatures: {
      jsx: true,
    },
  },

  plugins: [
    'jest',
    'import',
    '@typescript-eslint',
    'jest-dom',
    'testing-library',
  ],

  rules: {
    'linebreak-style': ['error', 'windows'],
    'import/extensions': ['error', {
      js: 'never',
      ts: 'never',
      jsx: 'never',
      tsx: 'never'
    }]
  },
  ignorePatterns: ['webpack.config.js', '.eslintrc.js', 'jest.config.js', 'setup-jest.js', 'tsconfig.json', 'babel.config.json', '.stylelintrc.json'],

  settings: {
    "import/resolver": "webpack"
  }
};
