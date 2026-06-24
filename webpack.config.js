const path = require('path');
const webpack = require('webpack');
const TsconfigPathsPlugin = require('tsconfig-paths-webpack-plugin');

module.exports = {
mode: 'development',
entry: {
monolithic: './monolithic/src/index.tsx',
'investment-manager': './microfrontends/investment-manager/src/index.tsx',
dashboard: './microfrontends/dashboard/src/index.tsx',
},
output: {
path: path.resolve(__dirname, 'dist'),
filename: '[name].bundle.js',
library: '[name]',
libraryTarget: 'umd',
},
resolve: {
extensions: ['.tsx', '.ts', '.js', '.css', '.module.css'],
plugins: [new TsconfigPathsPlugin()],
},
module: {
rules: [
{
test: /\.tsx?$/,
use: 'ts-loader',
exclude: /node_modules/,
},
{
test: /\.css$/,
use: ['style-loader', 'css-loader'],
},
{
test: /\.module\.css$/,
use: [
'style-loader',
{
loader: 'css-loader',
options: {
modules: true,
},
},
],
},
],
},
devServer: {
static: {
directory: path.join(__dirname, 'dist'),
},
compress: true,
port: 8080,
hot: true,
},
externals: {
react: 'React',
'react-dom': 'ReactDOM',
},
};
