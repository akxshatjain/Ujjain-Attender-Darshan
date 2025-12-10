/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{html,ts}",
    "./node_modules/flowbite/**/*.js"
  ],
  theme: {
    extend: {
      colors: {
        'mahakal': {
          'saffron': '#C74B2A', // Deep Terracotta/Burnt Orange (Less neon)
          'orange': '#E69045',  // Soft Amber
          'gold': '#C5A035',    // Antique Gold
          'deep-orange': '#9E381A', // Darker Rust
          'light-saffron': '#F2C1A2', // Soft Peach/Sand
          'cream': '#F9F7F2',   // Warm White/Cream
        },
        'temple': {
          'blue': '#2C3E50',    // Deep Slate Blue (Professional)
          'dark-blue': '#1A2530',
          'navy': '#0F172A',
        }
      },
      backgroundImage: {
        // Softer gradients
        'gradient-mahakal': 'linear-gradient(135deg, #C74B2A 0%, #E69045 100%)',
        'gradient-temple': 'linear-gradient(135deg, #2C3E50 0%, #4A6572 100%)',
        'gradient-gold': 'linear-gradient(135deg, #C5A035 0%, #E5C568 100%)',
        'gradient-saffron-radial': 'radial-gradient(circle, #E69045 0%, #C74B2A 100%)',
        'gradient-cream': 'linear-gradient(to bottom, #FFFFFF 0%, #F9F7F2 100%)',
      },
      fontFamily: {
        'poppins': ['Poppins', 'sans-serif'],
        'inter': ['Inter', 'sans-serif'],
      },
      animation: {
        'fade-in': 'fadeIn 0.5s ease-in',
        'slide-up': 'slideUp 0.6s ease-out',
        'scale-in': 'scaleIn 0.4s ease-out',
        'float': 'float 3s ease-in-out infinite',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideUp: {
          '0%': { transform: 'translateY(30px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
        scaleIn: {
          '0%': { transform: 'scale(0.9)', opacity: '0' },
          '100%': { transform: 'scale(1)', opacity: '1' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-10px)' },
        },
      },
      boxShadow: {
        'mahakal': '0 10px 30px -5px rgba(199, 75, 42, 0.25)', // Softer shadow
        'temple': '0 10px 30px -5px rgba(44, 62, 80, 0.25)',
        'gold': '0 10px 30px -5px rgba(197, 160, 53, 0.25)',
      },
    },
  },
  plugins: [
    require('flowbite/plugin')
  ],
};
