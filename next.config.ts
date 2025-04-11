import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
    webpack(config, { isServer }) {
        // Thêm cấu hình để xử lý các tệp video
        config.module.rules.push({
            test: /\.(mp4|webm|ogg|mp3|wav|flac|aac)$/i,
            use: {
                loader: 'file-loader',
                options: {
                    publicPath: '/_next/static/videos/', // Đường dẫn công khai
                    outputPath: 'static/videos/', // Đường dẫn lưu trữ tệp
                    name: '[name].[hash].[ext]', // Đặt tên cho tệp video
                },
            },
        });

        return config;
    },
};

export default nextConfig;
