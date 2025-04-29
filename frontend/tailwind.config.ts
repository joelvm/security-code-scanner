import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./app/**/{**,.client,.server}/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: "#3490dc",
      }
    }
  },
  plugins: [],
};
export default config;
