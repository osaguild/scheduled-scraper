import type { Config } from "@jest/types";

// Sync object
const config: Config.InitialOptions = {
  testEnvironment: "node",
  roots: ["<rootDir>/test"],
  testMatch: ["**/*.test.ts"],
  transform: {
    "^.+\\.tsx?$": "ts-jest",
  },
};
export default config;
