/* global __dirname */
const path = require('path');
// const webpack = require('webpack');
// const autoprefixer = require('autoprefixer');
// const CopyWebpackPlugin = require('copy-webpack-plugin');
const CircularDependencyPlugin = require('circular-dependency-plugin');

module.exports = {
	mode: 'development',
	entry: {
		app: './src/app.js',
		'word-cloud': './src/word-cloud.js',
	},
	output: {
		path: path.resolve(`${__dirname}/../public/`),
		filename: '[name].js',
	},
	module: {
		rules: [
			{ test: /\.sass$/, loaders: ['style-loader', 'css-loader'/*, 'postcss-loader' */, 'sass-loader'] },
			{ test: /\.(jpg|png|svg)$/, loader: 'url-loader', options: { limit: 8192 } },
			{ test: /\.ttf$/, loader: 'url-loader' },
			{ test: /\.html$/, loader: 'raw-loader' },
			{ test: /\.svg$/, loader: 'raw-loader' },
			{
				test: /\.js$/,
				exclude: /node_modules/,
				loader: 'babel-loader',
			},
		],
	},
	plugins: [
		// new CopyWebpackPlugin([
		// 	{ context: './src/public/', from: '**/*', to: './' },
		// 	{ context: './data/thumbs', from: '**/*', to: './thumbs' }
		// ]),
		new CircularDependencyPlugin({
			failOnError: true,
			exclude: /node_modules/,
		}),
		// new webpack.LoaderOptionsPlugin({
		// 	options: {
		// 		context: __dirname,
		// 		postcss: [autoprefixer],
		// 		babel: {
		// 			presets: ['es2015', 'stage-2'],
		// 			comments: false,
		// 			plugins: ['transform-es2015-destructuring', 'transform-object-rest-spread'],
		// 		},
		// 	},
		// }),
	],
};
