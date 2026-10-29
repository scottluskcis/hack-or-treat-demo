import nextConfig from "eslint-config-next/core-web-vitals";

const config = [
  {
    ...nextConfig[0],
  },
  ...nextConfig.slice(1),
  {
    ignores: [".next/**", "coverage/**", "node_modules/**"],
  },
];

export default config;
