const path = require('path')
const webpack = require('webpack')
const ExtractTextPlugin = require('extract-text-webpack-plugin')

const extractLess = new ExtractTextPlugin({ filename: '[name].css' })	// [name] resolves to name of bundle (e.g., app)

const config = {
	context: path.resolve('./src'),
	devtool: 'eval',
	entry: { app: '.' },
	module: {
		rules: [
			{
				test: /\.jsx?$/,
				exclude: /node_modules/,
				loader: 'babel-loader'
			},
			{
				test: /\.(less|css)$/,
				use: extractLess.extract({
					use: [
						{
							loader: 'css-loader',
							options: { importLoaders: 1 }
						},
						{ loader: 'postcss-loader' },
						{ loader: 'less-loader' }
					],
					fallback: 'style-loader'
				})
			}
		]
	},
	output: {
		filename: '[name].js',	// [name] resolves to name of bundle (e.g., app)
		path: path.resolve('./build')
	},
	plugins: [
		new webpack.NoEmitOnErrorsPlugin(),
		extractLess
	],
	resolve: {
		extensions: ['.js', '.jsx'],
		modules: [
			path.resolve('./src'),
			'node_modules'
		]
	},
	target: 'web'
}

module.exports = config
