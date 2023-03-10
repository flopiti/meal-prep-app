/** @type {import('next').NextConfig} */

const { i18n } = require('./next-i18next.config')


const nextConfig = {
  i18n,
  reactStrictMode: true,
  assetPrefix: process.env.NEXT_PUBLIC_URL,
  images: {
    domains: ['ibb.co', 'i.ibb.co'],
  },
}

module.exports = nextConfig
