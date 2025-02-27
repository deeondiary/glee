import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
    reactStrictMode: false,
    images: {
        remotePatterns: [
            {
                protocol: 'http',
                hostname: 'k.kakaocdn.net',
            },
        ],
    },
    // assetPrefix: '.',
    // output: "standalone",
};

export default nextConfig;
