const path = require('path')
const webpack = require('webpack')

module.exports = (env, args) => {
    const isProd = process.env.NODE_ENV === 'production'
    const isDev = !isProd
    const filename = ext => isProd ? `[name].[contenthash].${ext}` : `[name].bundle.${ext}`

    return {

        entry: './index.ts',
        devtool: 'inline-source-map',
        module: {
            rules: [{
                test: /\.tsx?$/,
                use: 'ts-loader',
                exclude: /node_modules/,
            },],
        },
        resolve: {
            extensions: ['.tsx', '.ts', '.js'],
        },
        output: {
            filename: 'bundle.js',
            path: path.resolve ( __dirname, 'dist' ),
        }
    }
}