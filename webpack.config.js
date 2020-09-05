/* eslint-disable no-undef */
const path = require("path");
const webpack = require("webpack");
const htmlPlugin = require("html-webpack-plugin");
const miniCssExtractPlugin = require("mini-css-extract-plugin");
const autoprefixer = require("autoprefixer");
const Uglify = require("uglifyjs-webpack-plugin");
const MiniCss = require("optimize-css-assets-webpack-plugin");
/**
 * @description Webpack Configeration
 */
module.exports = {
    // Development Server
    devServer: {
        contentBase: path.join(__dirname, "dist"),
        compress: true,
        port: 4000,
    },

    // Modules Rule
    module: {
        rules: [{
                enforce: "pre",
                test: /\.(js)$/,
                exclude: /node_modules/,
                use: [{
                    loader: "eslint-loader",
                    options: {
                        fix: true,
                    },
                }, ],
            },
            {
                test: /\.(js)$/,
                exclude: /node_modules/,
                use: [{
                    loader: "babel-loader",
                }],
            },
            {
                test: /\.(scss|sass)$/,
                use: [{
                        loader: miniCssExtractPlugin.loader,
                    },
                    {
                        loader: "css-loader",
                    },
                    {
                        loader: "postcss-loader",
                    },
                    {
                        loader: "sass-loader",
                    },
                ],
            },
            {
                test: /\.(jpg|jpeg|svg|png)$/,
                use: {
                    loader: "file-loader",
                    options: {
                        name: "[name].[ext]",
                        outputPath: "images",
                    },
                },
            },
            {
                test: /\.(svg|ttf|eot|woff|woff2)(\?\S*)?$/,
                use: [{
                    loader: "file-loader",
                    options: {
                        name: "[name].[ext]",
                        outputPath: "fonts",
                    },
                }, ],
            },
            {
                test: /\.(pug)$/,
                use: ["html-loader", "pug-html-loader"],
            },
        ],
    },

    // Optimization File
    optimization: {
        minimizer: [
            new Uglify({
                exclude: /node_modules/,
            }),
            new MiniCss(),
        ],
    },

    // Plugin
    plugins: [
        new htmlPlugin({
            hash: true,
            inject: "body",
            template: "./src/index.pug",
            minify: {
                removeComments: true,
                collapseWhitespace: true,
                removeAttributeQuotes: true,
            },
        }),
        new miniCssExtractPlugin(),
        new webpack.LoaderOptionsPlugin({
            options: {
                postcss: autoprefixer,
            },
        }),
    ],
};