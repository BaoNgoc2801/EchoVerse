import js from "@eslint/js";
import globals from "globals";
import tseslint from "typescript-eslint";
import pluginReact from "eslint-plugin-react";
import { defineConfig } from "eslint/config";

export default defineConfig([
  // Các cấu hình cho JavaScript và TypeScript
  {
    files: ["**/*.{js,mjs,cjs,ts,jsx,tsx}"],
    plugins: { js },
    extends: ["js/recommended"],
  },
  {
    files: ["**/*.{js,mjs,cjs,ts,jsx,tsx}"],
    languageOptions: { globals: globals.node },
  },
  tseslint.configs.recommended, // Sử dụng cấu hình TypeScript
  pluginReact.configs.flat.recommended, // Sử dụng cấu hình React mặc định
  {
    files: ["**/*.tsx", "**/*.jsx"],  // Đảm bảo quy tắc này chỉ áp dụng cho các file JSX/TSX
    rules: {
      "react/react-in-jsx-scope": "off",  // Tắt lỗi về React không nằm trong scope khi sử dụng JSX (React 17+ không cần import React)
      "react/jsx-uses-react": "off",      // Tắt quy tắc cần import React trong JSX
    },
  },
]);
