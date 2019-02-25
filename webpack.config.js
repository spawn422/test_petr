const path = require('path');
const webpack = require('webpack');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const UglifyJsPlugin = require("uglifyjs-webpack-plugin");
const CopyWebpackPlugin = require('copy-webpack-plugin');
const ImageminPlugin = require('imagemin-webpack-plugin').default
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const NODE_ENV = process.env.NODE_ENV || "development";

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
								/*{
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
								},*/
								{
									test: /\.scss$/,
									use:  [  'style-loader', MiniCssExtractPlugin.loader, 'css-loader', 'postcss-loader', 'sass-loader']
								},
								{
									test: /\.(png|gif|jpe?g)$/i,
									loaders:[
										{
											loader: 'file-loader',
											options:{
													name: '[name].[ext]',
													//publicPath:"/img"
													outputPath: './img',
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
					Vue: ['vue/dist/vue.esm.js', 'default'],
					$:'jquery',
					jQuery: 'jquery',
					jquery: 'jquery',
					Popper: ['popper.js', 'default']
				}),
					
			    new MiniCssExtractPlugin({
      				filename: './css/style.css'
    			}),

    			new CleanWebpackPlugin(
    				[
    				'dist'
    				]
    			),

    			new CopyWebpackPlugin(
    				[
    						{from: './src/img', to: './img'}
    				],
    				{
   					ignore:[
    								{glob: 'svg/*'},
    					]
    				}
					),

				// new ImageminPlugin ({
				// 	pngquant: {
				// 		quality: '95-100'
				// 	  },
				// 	test: /\.(png|jpe?g|gid|svg)$/i
				// }),

				// new webpack.LoaderOptionsPlugin ({
				// 	minimiza:true
				// }),	
				// new UglifyJsPlugin({
				//   test: /\.js(\?.*)?$/i,
				// }),


		],
};




/*if (isProduction) {
 	conf.plugins.push (
 		new UglifyJSPlugin ({
 			sourceMap:true
 		}),
 	);
 	conf.plugins.push (
 		new ImageminPlugin ({
 			test: /\.(png|jpe?g|gid|svg)$/i
 		}),
 	);
 	conf.plugins.push (
 		new webpack.LoaderOptionsPlugin ({
 			minimiza:true
 		}),
 	);
 }*/
module.exports = (env, options) => {
	let production = options.mode === 'production';

	if(production) {
		console.log("this is the prod env!!!!!!!!!!");
		conf.plugins.push( 
			new ImageminPlugin ({
				pngquant: {
					quality: '50-60'
					},
				test: /\.(png|jpe?g|gid|svg)$/i
			}), 
		);			
		conf.plugins.push(
			new UglifyJsPlugin({
				test: /\.js(\?.*)?$/i,
			}),
		);
		conf.plugins.push(
			new webpack.LoaderOptionsPlugin ({
				minimiza:true
			}),
		);
	}

	conf.devtool = production 
										? false
										: 'eval-sourcemap';
	
	return conf;
}