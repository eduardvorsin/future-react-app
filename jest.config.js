module.exports = {
  preset: 'ts-jest',

  roots: [
    "<rootDir>/src"
  ],

  transform: {
    "\\.[jt]sx?$": "ts-jest"
  },

  transformIgnorePatterns: [
    "[/\\\\]node_modules[/\\\\].+\\.(js|jsx|mjs|cjs|ts|tsx)$",
    "^.+\\.module\\.(css|sass|scss)$"
  ],

  collectCoverageFrom: [
    "src/**/*.{js,jsx,ts,tsx}",
    "!src/**/*.d.ts"
  ],

  setupFilesAfterEnv: [
    "<rootDir>setup-jest.js"
  ],

  testEnvironment: "jsdom",

  moduleNameMapper: {
    "\\.(jpg|jpeg|png|gif|webp|svg|ttf|woff|woff2)": "<rootDir>/src/tests/__mocks__/assets.ts"
  },

  testMatch: [
    "<rootDir>/src/**/__tests__/**/*.{js,jsx,ts,tsx}",
    "<rootDir>/src/**/*.{spec,test}.{js,jsx,ts,tsx}"
  ],

  moduleFileExtensions: [
    "ts",
    "tsx",
    "js",
    "jsx",
    "json",
    "node"
  ],

  watchPlugins: [
    "jest-watch-typeahead/filename",
    "jest-watch-typeahead/testname"
  ],

  resetMocks: true
};
