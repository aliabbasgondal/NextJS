/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  env: {
    SPACE_ID: "8opbb1li2nzq",
    CONTENTFUL_ACCESS_KEY: "12PLfzXUM1dOHCQtw7bs2lUP2Ps7bETiDDm_0UZ8zsE"
  },
  
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'images.ctfassets.net',
        port: '',
      },
    ],
  },
}

module.exports = nextConfig
