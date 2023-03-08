/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  assetPrefix: process.env.NEXT_PUBLIC_URL,
  images: {
    domains: ['ibb.co', 'i.ibb.co'],
  },
}

module.exports = nextConfig
