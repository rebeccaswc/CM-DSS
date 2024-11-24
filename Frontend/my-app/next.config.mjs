/** @type {import('next').NextConfig} */
const nextConfig = {
        async rewrites() {
          return [
            {
              source: '/api/:path*', // 捕捉所有以 /api/ 開頭的路徑
              destination: 'https://cm-dss.onrender.com/api/:path*', // 轉發到後端 URL
            },
          ];
        },
      };
      
      export default nextConfig;