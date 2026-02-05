/** @type {import('next').NextConfig} */
import withPWAInit from 'next-pwa';

const withPWA = withPWAInit({
  dest: 'public',
  register: true,
  skipWaiting: true,
  disable: process.env.NODE_ENV === 'development',
});

const nextConfig = {
  reactCompiler: true,
  // Ajoute cette configuration pour forcer la compatibilité Webpack sur Vercel
  webpack: (config) => {
    return config;
  },
  // On indique explicitement à Turbopack de ne pas s'en mêler pour le moment
  experimental: {
    turbo: {
      // Si tu as des règles spécifiques, elles iraient ici
    }
  }
};

export default withPWA(nextConfig);