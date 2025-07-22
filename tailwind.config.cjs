/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    // Ensure these paths correctly cover all your files using Tailwind classes
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./lib/**/*.{js,ts,jsx,tsx,mdx}",
    // If you have a 'src' folder containing everything, you can add or modify accordingly:
    // "./src/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: "#6366F1", // Indigo
        accent: "#8B5CF6",  // Violet
      },
    },
  },
  plugins: [
    require('@tailwindcss/line-clamp'),
  ],
};