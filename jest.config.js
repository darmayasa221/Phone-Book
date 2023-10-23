module.exports = {
  verbose: true,
  preset: "ts-jest",
  testEnvironment: "jsdom",
  collectCoverageFrom: ["**/*.{ts,tsx}", "!**/*.d.ts", "!**/node_modules/**"],
  setupFilesAfterEnv: ["<rootDir>/setupTests.ts"],
};
