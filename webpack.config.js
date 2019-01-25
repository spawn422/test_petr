const path = require('path');
const webpack = require('webpack');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const UglifyJSPlugin =  require('uglifyjs-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const ImageminPlugin = require('imagemin-webpack-plugin');
const ExtractTextPlugin = require("extract-text-webpack-plugin");

//var isProduction = process.env.NODE_ENV === 'production';

let conf = {
		//context: path.resolve(__dirname, 'src'),
		entry: {
				app:[
				'./src/js/index.js',
				'./src/scss/style.scss'
					]
		},
		output:{
		path: path.resolve(__dirname, './dist'),
		filename: 'js/app.js',
		publicPath: '/dist/',
		/*entry:'./src/js/index.js',
		output:{			
			path: path.resolve(__dirname, './dist'),
			filename: 'app.js',
			publicPath: '../'
		},
		*/
		},

		//devtool: (isProduction) ? 'sourcemap' : 'eval-source-map',

		module:{
				rules:[
						    {
						      test: /\.m?js$/,
						      exclude: /(node_modules|bower_components)/,
						      use: {
						        loader: 'babel-loader',
						        options: {
						          presets: ['@babel/preset-env']
						        }
						      }
						    },
								{
									test: /\.scss$/,
									use: ExtractTextPlugin.extract({
										use:[
													{
														loader:'css-loader',
														options:{ sourceMap: true}
													},
													{
														loader:'postcss-loader',
														options:{ sourceMap: true}
													},
													{
														loader:'sass-loader',
														options:{ sourceMap: true}
													},
										],
										fallback:'style-loader'
									})
								},
								{
									test: /\.(png|gif|jpe?g)$/,
									loaders:[
										{
											loader: 'file-loader',
											options:{
													name: '[name].[ext]',
													publicPath:"../img/"
											},
										},
										'img-loader',
									]
								},
								{
									test: /\.(woff|woff2|eot|ttf|otf)$/,
									use: [
												{
													loader: 'file-loader',
													options:{
														name: '[name].[ext]',
														outputPath:"fonts/",
														publicPath:"../fonts/"

													}
												}
									]
								},
								{
									test:/\.svg$/,
									loader:'svg-url-loader'
								}
				],
		},
		plugins: [
					new webpack.ProvidePlugin({
							$:'jquery',
							jQuery: 'jquery',
							jquery: 'jquery',
							Popper: ['popper.js', 'default']
					}),
					
			    new ExtractTextPlugin({
      		filename: './css/style.css'
    			}),

    			new CleanWebpackPlugin(
    				[
    				'dist'
    				]
    			),

    			new CopyWebpackPlugin(
    				[
    						{from: './src/img', to: 'img'}
    				],
    				{
   					ignore:[
    								{glob: 'svg/*'},
    					]
    				}
    			)
    			
		],
};

/*if (isProduction) {
 	module.exports.plugins.push (
 		new UglifyJSPlugin ({
 			sourceMap:true
 		}),
 	);
 	module.exports.plugins.push (
 		new ImageminPlugin ({
 			test: /\.(png|jpe?g|gid|svg)$/i
 		}),
 	);
 	module.exports.plugins.push (
 		new webpack.LoaderOptionsPlugin ({
 			minimiza:true
 		}),
 	);
 }*/
module.exports = (env, options) => {
	let production = options.mode === 'production';

	conf.devtool = production 
										? false//'sourcemap'
										: 'eval-sourcemap';


	// if (options.mode === 'production'){
	// 	module.exports.env.push (
	// 		new webpack.optimize.UglifyJsPlugin ({
	// 				sourceMap:true
	// 		}),
	// 	);
	// 	module.exports.plugins.push (
	// 		new ImageminPlugin ({
	// 			test: /\.(png|jpe?g|gid|svg)$/i
	// 		}),
	// 	);
	// 	module.exports.plugins.push (
	// 		new webpack.LoaderOptionsPlugin ({
	// 			minimiza:true
	// 		}),
	// 	);
	// }
	return conf;
}