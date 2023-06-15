/** @type {import('ts-jest').JestConfigWithTsJest} */
module.exports = {
  preset: "ts-jest",
  testEnvironment: "node",
  verbose: true,
  forceExit: true,
  testPathIgnorePatterns: ["/node_modules/", "/src/__tests__/__mocks__/"],
  clearMocks: true,
};
