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
    output: "standalone",
    async rewrites() {
        return [
            {
                source: '/suggestion/option/situation',
                destination: '/suggestion/option',
            },
            {
                source: '/suggestion/option/tone',
                destination: '/suggestion/option',
            },
            {
                source: '/suggestion/option/detail',
                destination: '/suggestion/option',
            },
            {
                source: '/suggestion/option/usage',
                destination: '/suggestion/option',
            },
        ]
    }
};

export default nextConfig;
