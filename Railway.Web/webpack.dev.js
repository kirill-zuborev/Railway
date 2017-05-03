var path = require('path');

var webpack = require('webpack');

var HtmlWebpackPlugin = require('html-webpack-plugin');
var CopyWebpackPlugin = require('copy-webpack-plugin');
var CleanWebpackPlugin = require('clean-webpack-plugin');
var helpers = require('./webpack.helpers');

console.log('@@@@@@@@@ USING DEVELOPMENT @@@@@@@@@@@@@@@');

module.exports = {
	devtool: 'source-map',
	performance: {
		hints: false
	},
	entry: {
		'app': './client/index.tsx',
		'vendor': './client/vendor.ts',
		'polyfills': './client/polyfills.ts'
	},

	output: {
		path: __dirname + '/wwwroot/',
		filename: 'dist/[name].bundle.js',
		chunkFilename: 'dist/[id].chunk.js',
		publicPath: '/'
	},

	resolve: {
		extensions: ['.ts','.tsx', '.js', '.json', '.css', '.less', '.html']
	},

	devServer: {
		historyApiFallback: true,
		contentBase: path.join(__dirname, '/wwwroot/'),
		watchOptions: {
			aggregateTimeout: 300,
			poll: 1000
		}
	},

	module: {
		rules: [
			{
				test: /\.ts$/,
				loaders: ['awesome-typescript-loader', 'source-map-loader']
			},
			{
				test: /\.tsx$/,
				loaders: ['awesome-typescript-loader', 'source-map-loader']
			},
			{
				test: /\.js$/,
				loaders: ['source-map-loader']
			},
			{
				test: /\.(png|jpg|gif|woff|woff2|ttf|svg|eot)$/,
				loader: 'file-loader?name=assets/[name]-[hash:6].[ext]'
			},
			{
				test: /favicon.ico$/,
				loader: 'file-loader?name=/[name].[ext]'
			},
			{
				test: /\.css$/,
				loader: 'style-loader!css-loader'
			},
			{
				test: /\.less$/,
				exclude: /node_modules/,
				loaders: ['style-loader', 'css-loader', 'less-loader']
			},
			{
				test: /\.html$/,
				loader: 'raw-loader'
			}
		],
		exprContextCritical: false
	},

	plugins: [
		new webpack.optimize.CommonsChunkPlugin({ name: ['vendor', 'polyfills'] }),

		new CleanWebpackPlugin(
			[
				'./wwwroot/dist',
				'./wwwroot/assets'
			]
		),

		new HtmlWebpackPlugin({
			filename: 'index.html',
			inject: 'body',
			template: 'client/index.html'
		}),

		new CopyWebpackPlugin([
			{ from: './client/images/*.*', to: 'assets/', flatten: true }
		])
	]

};

