/**
 * tailwind.config.js
 * Brand colours, fonts and breakpoints for Tailwind CSS.
 * Loaded from src/index.css with:  @config "../tailwind.config.js";
 *
 * HOW TO CHANGE THE BRAND COLOURS: edit the hex values below. Every button,
 * heading and background that uses "navy", "saffron" or "leaf" updates automatically.
 */

/** @type {import('tailwindcss').Config} */
export default {
  // Files Tailwind scans for class names. Classes not found here are removed from the CSS,
  // which keeps the CSS file small.
  content: ["./index.html", "./src/**/*.{js,jsx}"],
  theme: {
    // Mobile-first breakpoints: styles without a prefix apply to phones (360px+);
    // sm: large phones, md: tablets, lg: small laptops, xl: desktops, 2xl: large screens.
    screens: {
      sm: "640px",
      md: "768px",
      lg: "1024px",
      xl: "1280px",
      "2xl": "1536px",
    },
    extend: {
      colors: {
        // Primary brand colour, from the navy circle in the logo.
        navy: {
          50: "#EEEDF8",
          100: "#D9D7F0",
          200: "#B0ACE0",
          300: "#8580CC",
          400: "#5650B0",
          500: "#36318C",
          600: "#2B2779",
          700: "#23206B", // main navy
          800: "#1A1850",
          900: "#110F36",
        },
        // Accent colour for buttons and highlights, from the lotus petals.
        saffron: {
          50: "#FEF3EC",
          100: "#FCE2D1",
          200: "#F9C4A1",
          300: "#F4A06D",
          400: "#EE7F3D",
          500: "#E8641B", // main orange
          600: "#BD480D", // darker orange for text and buttons: passes the 4.5:1 contrast rule on white, light grey and light orange
          700: "#A33F0D",
          800: "#7C300B",
          900: "#5A2308",
        },
        // Secondary accent, from the green ring in the logo.
        leaf: {
          50: "#F3F9EA",
          100: "#E3F1CC",
          400: "#97CB52",
          500: "#7DBE2C", // main green
          600: "#5F9420",
          700: "#4A7319",
        },
        // Indigo accent and dark "night" background used by the /work page sections.
        accent: {
          100: "#E4E6FF",
          300: "#A8AEFF",
          500: "#4F5BFF",
          600: "#3F46E8",
          700: "#3338C9",
        },
        night: {
          800: "#111933",
          900: "#0B1020",
        },
        // Main text colour.
        ink: "#1F2937",
      },
      fontFamily: {
        // The CSS variables are created by next/font in app/layout.js.
        heading: ["var(--font-poppins)", "system-ui", "sans-serif"],
        body: ["var(--font-inter)", "system-ui", "sans-serif"],
      },
      maxWidth: {
        // Max content width from the design brief.
        content: "1280px",
      },
      boxShadow: {
        card: "0 4px 24px -6px rgba(35, 32, 107, 0.12)",
        "card-hover": "0 16px 40px -12px rgba(35, 32, 107, 0.25)",
      },
      keyframes: {
        // Used by the client logo strip to scroll forever.
        marquee: {
          "0%": { transform: "translateX(0)" },
          "100%": { transform: "translateX(-50%)" },
        },
      },
      animation: {
        marquee: "marquee 40s linear infinite",
      },
    },
  },
  plugins: [],
};
