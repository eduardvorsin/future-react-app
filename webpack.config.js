
const webpack = require('webpack');
const path = require('path');
const HTMLWebpackPlugin = require('html-webpack-plugin');
const TerserWebpackPlugin = require('terser-webpack-plugin');
const ESLintPlugin = require('eslint-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const CssMinimizerWebpackPlugin = require('css-minimizer-webpack-plugin');
const ForkTsCheckerWebpackPlugin = require('fork-ts-checker-webpack-plugin');
const StylelintPlugin = require('stylelint-webpack-plugin');
const ImageMinimizerWebpackPlugin = require('image-minimizer-webpack-plugin');
const CopyWebpackPlugin = require("copy-webpack-plugin");
const CompressionWebpackPlugin = require("compression-webpack-plugin");
const WebpackBundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;

const isDevelopment = process.env.NODE_ENV === 'development';
const isProduction = !isDevelopment;

const imagesRegExp = /\.(jpe?g|png|gif|webp)$/i;
const svgRegExp = /\.svg(\?.+)?$/i;
const fontsRegExp = /\.(woff2?|eot|ttf|otf)$/i;
const stylesRegExp = /\.(sa|sc|c)ss$/i;
const jsRegExp = /\.[jt]sx?/i;

const optimization = () => {
  const config = {
    runtimeChunk: 'single',
    moduleIds: 'deterministic',
    splitChunks: {
      cacheGroups: {
        vendor: {
          test: /[\\/]node_modules[\\/]/,
          name: 'vendors',
          chunks: 'all',
        },
      },
    },
    minimizer: [],
  };

  if (isProduction) {
    config.minimizer.push(
      new TerserWebpackPlugin(),
      new CssMinimizerWebpackPlugin(),
      new ImageMinimizerWebpackPlugin({
        minimizer: {
          implementation: ImageMinimizerWebpackPlugin.imageminMinify,
          options: {
            plugins: [
              "imagemin-gifsicle",
              "imagemin-mozjpeg",
              "imagemin-pngquant",
              "imagemin-svgo",
            ],
          }
        },
        generator: [
          {
            preset: 'webp',
            implementation: ImageMinimizerWebpackPlugin.imageminGenerate,
            options: {
              plugins: ['imagemin-webp'],
            },
          },
        ],
      }),
    );
  }

  return config;
}

const cssLoaders = () => {
  const loaders = [
    {
      loader: isDevelopment ? 'style-loader' : MiniCssExtractPlugin.loader,
    },
    {
      loader: 'css-loader',
      options: {
        importLoaders: 3,
        modules: {
          auto: true,
          localIdentName: isDevelopment ? '[path][name][ext]__[local]' : '[hash:base64]',
          localIdentContext: path.resolve(__dirname, "src"),
        }
      }
    },
    {
      loader: 'postcss-loader',
      options: {
        postcssOptions: {
          plugins: [
            [
              'postcss-import',
              'postcss-preset-env',
            ]
          ],
        }
      }
    },
    'resolve-url-loader',
    {
      loader: 'sass-loader',
      options: {
        sourceMap: true,
      },
    },
  ];

  return loaders;
};

const svgRules = () => {
  return [
    {
      type: 'asset/resource',
      resourceQuery: /url/,
      generator: {
        filename: 'assets/images/icons/[name][contenthash][ext]',
      }
    },
    {
      issuer: /\.[jt]sx?$/,
      resourceQuery: { not: [/url/] },
      use: [
        {
          loader: '@svgr/webpack',
          options: {
            prettier: false,
            svgo: true,
            svgoConfig: {
              plugins: [{
                name: 'preset-default',
                params: {
                  overrides: {
                    removeViewBox: false
                  }
                }
              }],
            },
            titleProp: true,
            ref: true,
          },
        },
      ],
    }
  ]
};

const plugins = () => {
  const plugins = [
    new HTMLWebpackPlugin({
      hash: true,
      template: './src/index.html',
      minify: true,
    }),

    new StylelintPlugin({
      cache: true,
      fix: true,
      failOnError: true,
    }),

    new MiniCssExtractPlugin({
      filename: isDevelopment ? 'css/[name].css' : 'css/[name][contenthash].css',
    }),

    new ForkTsCheckerWebpackPlugin({
      async: isDevelopment,
    }),

    new WebpackBundleAnalyzerPlugin({
      openAnalyzer: false,
    }),
  ];

  if (isDevelopment) {
    plugins.push(
      new ESLintPlugin({
        cache: true,
      }),
    );
  } else if (isProduction) {
    plugins.push(
      new CopyWebpackPlugin({
        patterns: [
          {
            from: path.resolve(__dirname, 'src/assets/static'),
            to: path.resolve(__dirname, 'dist/assets/static'),
          },
        ],
      }),
      new CompressionWebpackPlugin({
        test: /\.(js|css|html|svg)$/,
        algorithm: "gzip",
        exclude: /.map$/,
      }),
    );
  }

  return plugins;
}

module.exports = {
  target: ['browserslist'],

  mode: isDevelopment ? 'development' : 'production',

  entry: {
    index: path.resolve(__dirname, 'src', 'index.tsx'),
  },

  output: {
    filename: isDevelopment ? 'js/[name].js' : 'js/[name][contenthash].js',
    path: path.resolve(__dirname, 'dist'),
    clean: true,
  },

  resolve: {
    extensions: [
      '.ts',
      '.tsx',
      '.js',
      '.jsx',
    ],

    alias: {},
    symlinks: false,
  },

  optimization: optimization(),

  devtool: isDevelopment ? 'inline-source-map' : 'source-map',

  devServer: {
    hot: isDevelopment,
    compress: true,
    open: true,
    watchFiles: path.resolve(__dirname, 'src'),
    static: {
      directory: './dist',
    },
    client: {
      overlay: {
        errors: true,
        warnings: false,
      },
    },
  },

  plugins: plugins(),

  watchOptions: {
    ignored: '/node_modules/',
  },

  module: {
    rules: [{
      test: imagesRegExp,
      type: 'asset/resource',
      exclude: '/node_modules/',
      generator: {
        filename: 'assets/images/[name][contenthash][ext]',
      }
    },
    {
      test: svgRegExp,
      oneOf: svgRules(),
      exclude: '/node_modules/',
    },
    {
      test: fontsRegExp,
      type: 'asset/resource',
      exclude: '/node_modules/',
      generator: {
        filename: 'assets/fonts/[name][contenthash][ext]'
      },
    },
    {
      test: stylesRegExp,
      use: cssLoaders(),
      exclude: '/node_modules/',
    },
    {
      test: jsRegExp,
      exclude: [
        '/node_modules/',
      ],
      use: [
        'thread-loader',
        {
          loader: 'babel-loader',
          options: {
            cacheDirectory: true,
          }
        }
      ],
    }]
  }
};	
