const path = require('path');

module.exports = {
	entry: './potassium/main.js',
	output: {
		filename: 'potassium.js',
		path: path.resolve(__dirname, 'dist')
	},
	module: {
		rules: [
			{
				test: /\.js$/,
				include: [
					path.resolve(__dirname, "potassium"),
				],
				use: {
					loader: 'babel-loader',
					options: {
						presets: ['env'],
						plugins: [
							["transform-runtime", { polyfill: false }]
						]
					}
				}
			}
		]
	},
	resolve: {
		extensions: ['.js']
	}
};
