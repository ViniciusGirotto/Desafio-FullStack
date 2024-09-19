/** @type {import('next').NextConfig} */
const nextConfig = {
  async redirects() {
    return [
      {
        source: '/',
        destination: '/niveis',
        permanent: true,
      },
    ];
  },
};

export default nextConfig;