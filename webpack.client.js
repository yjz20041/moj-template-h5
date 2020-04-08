const path = require('path');
const webpack = require('webpack');
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin');
const PolyfillCandyPlugin = require('@music/polyfill-candy-webpack-plugin');
const ROOT_PATH = path.resolve(__dirname, '.');
const DIST_PATH = path.resolve(__dirname, './public');
const CleanPlugin = require('clean-webpack-plugin');
const HtmlPlugin = require('html-webpack-plugin');
const HtmlWebpackHarddiskPlugin = require('html-webpack-harddisk-plugin');
const HtmlWebpackInlineSourcePlugin = require('html-webpack-inline-source-plugin');
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;
const SOURCE_PATH = path.join(__dirname, './src');


module.exports = (env, argv) => {
  const mode = argv.mode || 'development';
  const PRODUCTION = mode === 'production';
  env = env || {};
  const appId = env.id;
  const buildProduction = env.prod
  const cdnPath = buildProduction ? '//s6.music.126.net' : '//cdntest.igame.163.com';
  const config =  {
    entry: {
      index: [path.resolve(__dirname, './src/page/index.jsx')]
    },
    output: {
      path: DIST_PATH,
      filename: PRODUCTION ? '[name].[hash:8].js' : '[name].js',
      publicPath: PRODUCTION ? (appId ? `${cdnPath}/static_public/${appId}/` : '/st/{{projectName}}') : '/'
    },
    resolve: {
      extensions: ['.jsx', '.js', '.css'],
      alias: {
        '@': SOURCE_PATH,
        '@asset': path.resolve(SOURCE_PATH, 'asset'),
        '@css': path.resolve(SOURCE_PATH, 'css'),
        '@component': path.resolve(SOURCE_PATH, 'component'),
        '@container': path.resolve(SOURCE_PATH, 'container'),
        '@service': path.resolve(SOURCE_PATH, 'service'),
        '@util': path.resolve(SOURCE_PATH, 'util'),
        '@redux': path.resolve(SOURCE_PATH, 'redux')
      }
    },
    module: {},
    mode,
    devtool: PRODUCTION ? 'source-map' : 'inline-source-map'
  }
  // 规则
  let rules = [
    {
      test: /\.(js|jsx)$/,
      exclude: /node_modules(?!\/@music\/mobile)/,
      use: [
        {
          loader: 'babel-loader'
        }
      ]
    },
    {
      test: /\.(gif|jpg|png|svg|eot|ttf|woff)$/,
      loader: 'file-loader'
    }
  ];
  // 插件
  let plugins = [
    new CleanPlugin(),
    new webpack.DefinePlugin({
      APPID: JSON.stringify(appId)
    })
  ];

  if (!PRODUCTION) {
        const proxy = require('./proxy.config');
        const proxyTarget = argv.proxyTarget;
        if (proxyTarget) {
            proxy.forEach(p => {
                p.target = p.target.replace(/qa-\w+/, `qa-${proxyTarget}`)
            })
        }
        config.devServer = {
            contentBase: DIST_PATH,
            compress: true,
            port: 7166,
            hot: false,
            hotOnly: true,
            historyApiFallback: true,
            proxy,
            open: true
        };
    }
  
    if (env.analysis) {
      plugins.push(new BundleAnalyzerPlugin());
    }

  // html
  plugins.push(
    new HtmlPlugin({
      template: path.join(__dirname, './src/view/index.ejs'),
      filename: 'index.html',
      alwaysWriteToDisk: true,
      inlineSource: PRODUCTION ? /\.css$/ : false,
      puzzleSuffix: PRODUCTION ? '' : '-test'
    }),
    new HtmlWebpackHarddiskPlugin({
      outputPath: DIST_PATH
    }),
    new PolyfillCandyPlugin({
      enabled: true,
      upload: true,
      prod: PRODUCTION
      // debug: !PRODUCTION
    })
    // new PreloadPlugin()
  )
  if (PRODUCTION) {
    plugins.push(
      new HtmlWebpackInlineSourcePlugin()
    )
  }

  // css 相关
  let cssLoaders = [
    {
      loader: 'css-loader'
    },
    {
      loader: 'postcss-loader'
    }
  ];

  if (!PRODUCTION) {
    cssLoaders.unshift({
      loader: 'style-loader'
    })
  } else {
    cssLoaders.unshift({
      loader: MiniCssExtractPlugin.loader
    })
    plugins.push(
      new MiniCssExtractPlugin({
        filename: '[name][hash:8].css',
        chunkFilename: '[id][hash:8].css'
      })
    )

  }

  rules.push({
    test: /\.css$/,
    use: cssLoaders
  })

  // tree shaking in developmemt mode
  config.optimization = {
    usedExports: true,
    sideEffects: true,
    nodeEnv: 'development'
  }

  // optimization
  if (PRODUCTION) {
    config.optimization = {
      nodeEnv: 'production',
      minimizer: [
        new UglifyJsPlugin({
          cache: true,
          parallel: true,
          sourceMap: true
        }),
        new OptimizeCSSAssetsPlugin({})
      ],
      splitChunks: {
        chunks: 'all'
      }
    }
  }

  // 设置 rules
  config.module.rules = rules;
  // 设置 插件
  config.plugins = plugins;
  return config;

}
