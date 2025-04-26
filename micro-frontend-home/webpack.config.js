// webpack.config.js - micro-frontend-home
const { ModuleFederationPlugin } = require("webpack").container;

module.exports = {
    plugins: [
        new ModuleFederationPlugin({
            name: "home",
            filename: "remoteEntry.js",
            exposes: {
                './HomePage': './src/app/home/page.tsx',  // Expose HomePage
            },
            shared: ["react", "react-dom"],
        }),
    ],
};
