const path = require('path')

module.exports = {
	entry: './src/index.tsx',
	module: {
		rules: [
			{
				test: /\.(ts|tsx)$/,
				use: 'ts-loader',
				exclude: /node_modules/,
			},
		],
	},
	resolve: {
		extensions: ['.js', '.ts', '.tsx'],
	},
	output: {
		path: path.resolve(__dirname, 'dist'),
		filename: 'index.js',
		publicPath: 'dist/',
	},
	devServer: {
	  publicPath: '/dist/',
	  hot: true,
	  open: true,
	}
}