/** @type {import('next').NextConfig} */
const nextConfig = {
   
    webpack: (config) => {
    config.experiments = { ...config.experiments, topLevelAwait: true };
    return config;
  }, images:{
        domains: ["cdn.sanity.io"]
    },
   
    
}

module.exports = nextConfig
