import type { Configuration as DevServerConfiguration } from 'webpack-dev-server'

import path from 'path'
import webpack from 'webpack'
import HtmlWebpackPlugin from 'html-webpack-plugin'

export default () => {
    const config: webpack.Configuration = {
        mode: 'development',
        entry: path.resolve(__dirname, './src/index.tsx'),
        module: {
            rules: [
                {
                    test: /\.(ts|tsx)$/,
                    exclude: /node_modules/,
                    use: 'ts-loader',
                },
                {
                    test: /\.(scss|css)$/,
                    exclude: /node_modules/,
                    use: [
                        'style-loader',
                        {
                            loader: 'css-loader',
                            options: {
                                modules: {
                                    namedExport: false,
                                    localIdentName: '[name]_[local]_[hash:base64]',
                                },
                            },
                        },
                        'sass-loader',
                    ],
                },
                {
                    test: /\.(scss|css)$/,
                    exclude: /src/,
                    use: [
                        'style-loader',
                        'css-loader',
                        'sass-loader',
                    ],
                },
            ],
        },
        resolve: {
            extensions: ['.ts', '.tsx', '.js', '.jsx'],
        },
        output: {
            path: path.resolve(__dirname, './dist'),
            filename: '[name].[contenthash].js',
            clean: true,
        },
        plugins: [
            new HtmlWebpackPlugin({ template: path.resolve(__dirname, '/public/index.html') }),
        ],
        devtool: 'inline-source-map',
        devServer: {
            port: 3000,
            open: true,
        }
    }

    return config
}
