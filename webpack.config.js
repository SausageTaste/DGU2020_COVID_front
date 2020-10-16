const webpack = require("webpack");
const path = require("path");


module.exports = [{
    cache: true,
    devtool: "source-map",
    devServer: {
        historyApiFallback: true,
    },
    context: path.resolve(__dirname, "src"),
    entry: "./main.tsx",
    output: {
        filename: "./dist/js/build.js",
    },

    module: {
        rules: [
            {
                test: /\.ts(x?)$/,
                exclude: /node_module/,
                use: ['ts-loader'],
            },
        ],
    },

    resolve: {
        modules: [
            path.join(__dirname, "src"),
            "node_modules",
        ],
        extensions: [".ts", ".tsx", ".js"],
    },
}];
