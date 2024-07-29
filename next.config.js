/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: [
      "googleusercontent.com",
      "oaidalleapiprodscus.blob.core.windows.net",
      "cdn.openai.com"
    ]
  },
}
module.exports = {
  ignoreBuildErrors: true,
  reactStrictMode: true,
  swcMinify: true,
};


