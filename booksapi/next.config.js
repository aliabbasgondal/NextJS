/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    appDir: true,
  },
  env:{
    PGHOST:'ep-rough-snow-254521.us-east-2.aws.neon.tech',
PGDATABASE:'neondb',
PGUSER:'aliabbasgondal',
PGPASSWORD:'TQeNBP0mpE1K'
  }
}

module.exports = nextConfig
