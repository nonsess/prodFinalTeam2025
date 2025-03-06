/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ['prod-team-16-qi3lk0el.final.prodcontest.ru'], // Добавьте домен вашего API сервера
    remotePatterns: [
      {
        protocol: 'http',
        hostname: 'prod-team-16-qi3lk0el.final.prodcontest.ru',
        port: '8080', // Укажите порт, если необходимо
        pathname: '/**',
      },
    ],
    unoptimized: true,
  },
};

export default nextConfig;
