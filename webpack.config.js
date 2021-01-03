const path = require('path');
const HTMLWebpackPlugin = require('html-webpack-plugin');
const {CleanWebpackPlugin} = require('clean-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const OptimizeCssAssetWebpackPlugin = require('optimize-css-assets-webpack-plugin');
const TerserWebpackPlugin = require('terser-webpack-plugin');
const ImageminPlugin = require('imagemin-webpack');
const HtmlWebpackPugPlugin = require('html-webpack-pug-plugin');



const isDev = process.env.NODE_ENV === 'development';
const isProd = !isDev;



const filename = (ext) => isDev ? `[name].${ext}` : `[name].[contenthash].${ext}`;

const optimization = () => {
    const configObj = {
      splitChunks: {
        chunks: 'all'
        }
    };
    if (isProd) {
        configObj.minimizer = [
          new OptimizeCssAssetWebpackPlugin(),
          new TerserWebpackPlugin()
        ];
      }
    
      return configObj;
};

  



const plugins = () => {
    const basePlugins = [
      new HTMLWebpackPlugin({
        template: path.resolve(__dirname, './src/pug/index.pug'),
        //filename: 'index.pug',
        minify: {
          collapseWhitespace: isProd
        }
      }),
      new HtmlWebpackPugPlugin({
       // adjustIndent: true
      }),
      new CleanWebpackPlugin(),
      new MiniCssExtractPlugin({
        filename: `./css/${filename('css')}`
      }),
      new CopyWebpackPlugin({
        patterns: [
          {from: path.resolve(__dirname, './src/assets') , to: path.resolve(__dirname, 'dist')}
        ]
      }),
    ];
  
    if (isProd) {
      basePlugins.push(
        new ImageminPlugin({
          bail: false, // Ignore errors on corrupted images
          cache: true,
          imageminOptions: {
            plugins: [
              ["gifsicle", { interlaced: true }],
              ["jpegtran", { progressive: true }],
              ["optipng", { optimizationLevel: 5 }],
              [
                "svgo",
                {
                  plugins: [
                    {
                      removeViewBox: false
                    }
                  ]
                }
              ]
            ]
          }
        })
      )
    }
  
    return basePlugins;
  };

module.exports = {
    context: path.resolve(__dirname, 'src'),
    mode: 'development',
    entry: './js/index.js',
    output: {
        filename: `./js/${filename('js')}`,
        path: path.resolve(__dirname, 'dist'),
        publicPath: ''
  },
  devServer: {
    historyApiFallback: true,
    contentBase: path.resolve(__dirname, 'dist'),
    open: true,
    compress: true,
    hot: true,
    port: 3000,
  },
  devtool: isProd ? false : 'source-map',
  optimization: optimization(),
  plugins: plugins(),
  module: {
    rules: [

        {
            test: /\.js$/,
            exclude: /node_modules/,
            use: ['babel-loader'],
        },


        {
            test: /\.html$/,
            loader: 'html-loader',
        },

        {
            test: /\.css$/i,
            use: [
              {
                loader: MiniCssExtractPlugin.loader,
              },
              'css-loader'
            ],
        },

        {
            test: /\.s[ac]ss$/,
            use: [
              {
                loader: MiniCssExtractPlugin.loader,
                options: {
                    publicPath: (resourcePath, context) => {
                        return path.relative(path.dirname(resourcePath), context) + '/';
                    },
                }
              },
              'css-loader',
              'sass-loader'
            ],
        },

        {
            test: /\.(?:|gif|png|jpg|jpeg|svg)$/,
            use: [{
              loader: 'file-loader',
              options: {
                name: `./img/${filename('[ext]')}`
              }
            }],
        },

        {
            test: /\.(ttf|woff|woff2|eot)$/,
            use: [{
                loader: 'file-loader',
                    options: {
                    name: `./fonts/${filename('[ext]')}`
                    }
            }],
        },

         
        {
            test: /\.pug$/,
            use: [
                {
                    loader: "html-loader"
                },
                {
                    loader: "pug-html-loader",
                    options: {
                        "pretty": true
                    }
                }
            ]
        }
    ],
  }
};