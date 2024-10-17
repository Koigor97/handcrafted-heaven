/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: ['class'],
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}'
  ],
  theme: {
    extend: {
      colors: {
        background: 'hsl(var(--background))',
        foreground: 'hsl(var(--foreground))',
        card: {
          DEFAULT: 'hsl(var(--card))',
          foreground: 'hsl(var(--card-foreground))'
        },
        popover: {
          DEFAULT: 'hsl(var(--popover))',
          foreground: 'hsl(var(--popover-foreground))'
        },
        primary: {
          DEFAULT: 'hsl(var(--primary))',
          foreground: 'hsl(var(--primary-foreground))'
        },
        secondary: {
          DEFAULT: 'hsl(var(--secondary))',
          foreground: 'hsl(var(--secondary-foreground))'
        },
        muted: {
          DEFAULT: 'hsl(var(--muted))',
          foreground: 'hsl(var(--muted-foreground))'
        },
        accent: {
          DEFAULT: 'hsl(var(--accent))',
          foreground: 'hsl(var(--accent-foreground))'
        },
        destructive: {
          DEFAULT: 'hsl(var(--destructive))',
          foreground: 'hsl(var(--destructive-foreground))'
        },
        border: 'hsl(var(--border))',
        input: 'hsl(var(--input))',
        ring: 'hsl(var(--ring))',
        chart: {
          1: 'hsl(var(--chart-1))',
          2: 'hsl(var(--chart-2))',
          3: 'hsl(var(--chart-3))',
          4: 'hsl(var(--chart-4))',
          5: 'hsl(var(--chart-5))'
        },

        /**
         * adding the custom project colors for tailwind to
         * know  about them and use them in the project
         */

        text: {
          50: 'hsl(var(--text-50))',
          100: 'hsl(var(--text-100))',
          200: 'hsl(var(--text-200))',
          300: 'hsl(var(--text-300))',
          400: 'hsl(var(--text-400))',
          500: 'hsl(var(--text-500))',
          600: 'hsl(var(--text-600))',
          700: 'hsl(var(--text-700))',
          800: 'hsl(var(--text-800))',
          900: 'hsl(var(--text-900))',
          950: 'hsl(var(--text-950))'
        },
        background1: {
          50: 'hsl(var(--background-1-50))',
          100: 'hsl(var(--background-1-100))',
          200: 'hsl(var(--background-1-200))',
          300: 'hsl(var(--background-1-300))',
          400: 'hsl(var(--background-1-400))',
          500: 'hsl(var(--background-1-500))',
          600: 'hsl(var(--background-1-600))',
          700: 'hsl(var(--background-1-700))',
          800: 'hsl(var(--background-1-800))',
          900: 'hsl(var(--background-1-900))',
          950: 'hsl(var(--background-1-950))'
        },
        primary1: {
          50: 'hsl(var(--primary-1-50))',
          100: 'hsl(var(--primary-1-100))',
          200: 'hsl(var(--primary-1-200))',
          300: 'hsl(var(--primary-1-300))',
          400: 'hsl(var(--primary-1-400))',
          500: 'hsl(var(--primary-1-500))',
          600: 'hsl(var(--primary-1-600))',
          700: 'hsl(var(--primary-1-700))',
          800: 'hsl(var(--primary-1-800))',
          900: 'hsl(var(--primary-1-900))',
          950: 'hsl(var(--primary-1-950))'
        },
        secondary1: {
          50: 'hsl(var(--secondary-1-50))',
          100: 'hsl(var(--secondary-1-100))',
          200: 'hsl(var(--secondary-1-200))',
          300: 'hsl(var(--secondary-1-300))',
          400: 'hsl(var(--secondary-1-400))',
          500: 'hsl(var(--secondary-1-500))',
          600: 'hsl(var(--secondary-1-600))',
          700: 'hsl(var(--secondary-1-700))',
          800: 'hsl(var(--secondary-1-800))',
          900: 'hsl(var(--secondary-1-900))',
          950: 'hsl(var(--secondary-1-950))'
        },
        accent1: {
          50: 'hsl(var(--accent-1-50))',
          100: 'hsl(var(--accent-1-100))',
          200: 'hsl(var(--accent-1-200))',
          300: 'hsl(var(--accent-1-300))',
          400: 'hsl(var(--accent-1-400))',
          500: 'hsl(var(--accent-1-500))',
          600: 'hsl(var(--accent-1-600))',
          700: 'hsl(var(--accent-1-700))',
          800: 'hsl(var(--accent-1-800))',
          900: 'hsl(var(--accent-1-900))',
          950: 'hsl(var(--accent-1-950))'
        },
        accent2: {
          50: 'hsl(var(--accent-2-50))',
          100: 'hsl(var(--accent-2-100))',
          200: 'hsl(var(--accent-2-200))',
          300: 'hsl(var(--accent-2-300))',
          400: 'hsl(var(--accent-2-400))',
          500: 'hsl(var(--accent-2-500))',
          600: 'hsl(var(--accent-2-600))',
          700: 'hsl(var(--accent-2-700))',
          800: 'hsl(var(--accent-2-800))',
          900: 'hsl(var(--accent-2-900))',
          950: 'hsl(var(--accent-2-950))'
        }
      },
      borderRadius: {
        lg: 'var(--radius)',
        md: 'calc(var(--radius) - 2px)',
        sm: 'calc(var(--radius) - 4px)'
      }
    }
  },
  plugins: [require('tailwindcss-animate'), require('tailwind-scrollbar')]
};
