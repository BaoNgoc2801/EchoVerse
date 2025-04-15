// webpack.config.js của micro-frontend-home
const path = require('path');
const { ModuleFederationPlugin } = require('webpack').container;

module.exports = {
    mode: 'development',
    entry: './src/index.tsx',
    output: {
        publicPath: 'auto',
        filename: '[name].bundle.js',
        path: path.resolve(__dirname, 'dist'),
    },
    plugins: [
        new ModuleFederationPlugin({
            name: 'home',
            remotes: {
                shell: 'shell@http://localhost:3000/remoteEntry.js',  // Địa chỉ của Shell App
            },
        }),
    ],
    devServer: {
        port: 3001,  // Port của micro-frontend home
    },
};
