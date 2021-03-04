const SubAppName = require('./app-config').appName;

const webpack = require('webpack');
const path = require('path');
const fs = require('fs');

const TerserPlugin = require('terser-webpack-plugin');
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin');

const TMPCorePath = 'node_modules/tmp-core';
const TMPConfigFile = path.resolve(`${TMPCorePath}/src/core/@exports/build-environment.js`);

console.log(`Configure TMP-core as ${TMPCorePath}`);
console.log(`Configure TMP-core config as ${TMPConfigFile}`);
console.log(`Configure sub-app name as ${SubAppName}`);

if (!fs.existsSync(path.resolve(TMPCorePath))) {
	throw new Error('TMP Core folder not found!');
}

if (!fs.existsSync(TMPConfigFile)) {
	throw new Error('TMP Core config file not found!');
}

console.log('Run Core environment preparation...');
const TMPConfig = require(TMPConfigFile)(TMPCorePath);

module.exports = (env, args) => {
	let isProduction = false;

	if (args && args['mode'] === 'production') {
		isProduction = true;
	}

	if (isProduction) {
		console.log('PRODUCTION BUILD');
	} else {
		console.log('DEVELOPMENT BUILD');
	}

	const sourcePath = path.join(__dirname, '../src');
	const outPath = path.join(__dirname, '../dist');

	const config = {
		context: sourcePath,
		entry: {
			app: './@index.tsx'
		},
		output: {
			path: outPath,
			publicPath: '',
			filename: `${SubAppName}.js`,
		},
		target: 'web',
		externals: TMPConfig.build.externals,
		devtool: isProduction ? false : 'source-map',
		stats: {
			assets: true,
			cached: false,
			cachedAssets: false,
			children: false,
			chunks: false,
			chunkModules: false,
			env: true,
			chunkOrigins: false,
			depth: false,
			entrypoints: true,
			errors: true,
			errorDetails: true,
			hash: false,
			modules: true,
			moduleTrace: false,
			performance: false,
			providedExports: false,
			publicPath: false,
			reasons: false,
			source: false,
			colors: true,
			timings: true,
			usedExports: false,
			version: true,
			warnings: true,
		},
		resolve: {
			extensions: ['.js', '.ts', '.tsx'],
			mainFields: ['module', 'browser', 'main'],
			alias: {
				app: path.resolve(__dirname, 'src/app/'),
				TMPUILibrary: TMPConfig.paths.UILibrary,
				...TMPConfig.paths.lessFiles
			},
		},
		module: {
			rules: [
				{
					test: /\.(ts|tsx)$/,
					// eslint
					enforce: 'pre',
					use: [
						{
							options: {
								eslintPath: require.resolve('eslint'),
							},
							loader: require.resolve('eslint-loader'),
						},
					],
					exclude: /node_modules/,
				},
				{
					test: /\.tsx?$/,
					exclude: /.*-jest\.tsx?/,
					use: [
						{
							loader: 'ts-loader',
							options: {
								transpileOnly: true,
								silent: false,
								configFile: path.resolve('./tsconfig.json')
							},
						}
					]
				},
				// css
				{
					test: /.(le|c)ss$/i,
					use: [
						{
							loader: 'file-loader',
							options: {
								name: `${SubAppName}.css`
							}
						},
						{
							loader: 'less-loader',
						}
					]
				},
			]
		},
		optimization: {
			splitChunks: {
				cacheGroups: {
					default: {
						minChunks: 1,
						priority: -20,
						reuseExistingChunk: true
					}
				},
			},
			runtimeChunk: false,
		},
		plugins: [
			new webpack.EnvironmentPlugin({
				NODE_ENV: isProduction ? 'production' : 'development',
				DEBUG: !isProduction
			}),
		],
		watchOptions: {
			aggregateTimeout: 100,
			ignored: /node_modules/,
			poll: 300
		},
	};

	if (isProduction) {
		config.optimization.minimize = true;
		config.optimization.minimizer = [
			new TerserPlugin(),
			new OptimizeCSSAssetsPlugin({}),
		]
	}

	return config;
};
