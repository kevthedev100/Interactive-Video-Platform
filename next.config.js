/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: [
      "googleusercontent.com",
      "oaidalleapiprodscus.blob.core.windows.net",
      "cdn.openai.com"
    ]
  },
  reactStrictMode: true,
  swcMinify: true,
  typescript: {
    // Ignoriert TypeScript-Fehler beim Bauen
    ignoreBuildErrors: true,
  },
  eslint: {
    // Ignoriert ESLint-Fehler beim Bauen
    ignoreDuringBuilds: true,
  },
}

module.exports = nextConfig;
