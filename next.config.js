/** @type {import('next').NextConfig} */

const { i18n } = require("./next-i18next.config");

const nextConfig = {
  i18n,
  reactStrictMode: true,
  assetPrefix: process.env.NEXT_PUBLIC_URL,
  images: {
    domains: ["ibb.co", "i.ibb.co", "example.com"],
  },
  serverRuntimeConfig: {
    auth0Domain: process.env.AUTH0_DOMAIN,
    auth0ClientId: process.env.AUTH0_CLIENT_ID,
    auth0RedirectUri: process.env.AUTH0_REDIRECT_URI,
    auth0Audience: process.env.AUTH0_AUDIENCE,
    backendUrl: process.env.BACKEND_URL,
  },
  publicRuntimeConfig: {
    // Add any public runtime configs here, if needed
  },
};

module.exports = nextConfig;
