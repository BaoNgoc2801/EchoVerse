// webpack.config.js - micro-frontend-container
const { ModuleFederationPlugin } = require("webpack").container;

module.exports = {
    plugins: [
        new ModuleFederationPlugin({
            remotes: {
                auth: 'auth@http://localhost:3001/remoteEntry.js',
                home: 'home@http://localhost:3002/remoteEntry.js',
            },
            shared: ["react", "react-dom"],
        }),
    ],
};
