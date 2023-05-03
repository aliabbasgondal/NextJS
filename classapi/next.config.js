/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    appDir: true,
  },
  env:{
    PGHOST:'ep-ancient-dew-002019.us-east-2.aws.neon.tech',
PGDATABASE:'neondb',
PGUSER:'aliabbasgondal',
PGPASSWORD:'46RiTZlKxFdC',
ENDPOINT_ID:'ep-ancient-dew-002019'
  }
}

module.exports = nextConfig
