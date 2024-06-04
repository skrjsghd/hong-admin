/** @type {import('next').NextConfig} */
const nextConfig = {
  async redirects() {
    return [
      {
        source: "/setting",
        destination: "/setting/connections",
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
