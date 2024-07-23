/** @type {import('ts-jest/dist/types').InitialOptionsTsJest} */
module.exports = {
  setupFiles: ["./jest.polyfills.js"],
  preset: "ts-jest",
  testEnvironment: "jsdom",
  testEnvironmentOptions: {
    customExportConditions: [""],
  },
  globals: {
    "ts-jest": {
      tsconfig: "./tsconfig.jest.json",
    },
    setupFileAfterEnv: ["./src/jest.setup.ts"],
    coverageThreshhold: {
      global: {
        branches: 100,
        functions: 100,
        lines: 100,
        statements: 100,
      },
    },
    moduleNameMapper: {
      "\\.(pdf|jpg|jpeg|png|gif|eot|otf|webp|svg|ttf|woff|woff2|mp4|webm|wav|mp3|m4a|aac|oga)$":
        "<rootDir>/__mocks__/fileMock.js",
    },
  },
};
