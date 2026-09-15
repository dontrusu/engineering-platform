import { defineConfig, globalIgnores } from "eslint/config";
import nextTypescript from "eslint-config-next/typescript";

export default defineConfig([
  ...nextTypescript,
  globalIgnores([
    ".next/**",
    ".next-e2e/**",
    "out/**",
    "build/**",
    "next-env.d.ts",
    "coverage/**",
    "playwright-report/**",
  ]),
]);
