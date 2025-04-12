import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
    webpack(config, { isServer }) {
        // Add configuration to handle video files
        config.module.rules.push({
            test: /\.(mp4|webm|ogg|mp3|wav|flac|aac)$/i,
            use: {
                loader: 'file-loader',
                options: {
                    publicPath: '/_next/static/videos/', // Public path for video files
                    outputPath: 'static/videos/', // Output path for video files in the build folder
                    name: '[name].[hash].[ext]', // Name format for video files
                },
            },
        });

        return config;
    },
};

export default nextConfig;
