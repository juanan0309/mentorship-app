/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  env: {
    NEXT_PUBLIC_MONGODB_URI: process.env.MONGODB_URI
  }
}

module.exports = nextConfig
