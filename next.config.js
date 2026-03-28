const nextConfig = {
  /* config options here */
  transpilePackages: [
    'embla-carousel',
    'embla-carousel-react',
    'embla-carousel-reactive-utils',
    'embla-carousel-autoplay',
  ],
  images: {
    unoptimized: true,
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'dokan.coastalmartbd.com',
      },
      {
        protocol: 'https',
        hostname: 'global-img-cdn.1688.com',
      },
      {
        protocol: 'https',
        hostname: 'cdn-icons-png.flaticon.com',
      },
      {
        protocol: 'https',
        hostname: 'yousuf.mamatazshop.com',
      },
      {
        protocol: 'https',
        hostname: 'next.mamatazshop.com',
      },
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
      },
    ],
  },
  output: 'standalone',
};

export default nextConfig;
