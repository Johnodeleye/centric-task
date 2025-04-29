/** @type {import('tailwindcss').Config} */
module.exports = {
    darkMode: "class",
    content: [
      "./app/**/*.{js,ts,jsx,tsx}",
      "./components/**/*.{js,ts,jsx,tsx}",
    ],
    theme: {
      extend: {
        colors: {
          background: "rgb(var(--background))",
          foreground: "rgb(var(--foreground))",
          primary: "rgb(var(--primary))",
          secondary: {
            DEFAULT: "rgb(var(--secondary))",
            text: "rgb(var(--secondary-text))" 
          },
          accent: "rgb(var(--accent))",
          warning: "rgb(var(--warning))",
          text: "rgb(var(--text))",
          textLight: "rgb(var(--text-light))",
          muted: {
            foreground: "rgb(var(--text-light))",
          },
        },
      },
    },
    plugins: [],
  };