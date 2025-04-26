// webpack.config.js - micro-frontend-auth
const { ModuleFederationPlugin } = require("webpack").container;

module.exports = {
    plugins: [
        new ModuleFederationPlugin({
            name: "auth",
            filename: "remoteEntry.js",
            exposes: {
                './AuthPage': './src/app/auth/signin/page.tsx',  // Expose AuthPage
            },
            shared: ["react", "react-dom"],
        }),
    ],
};
