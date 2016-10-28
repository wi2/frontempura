const path = require('path')
const webpack = require('webpack')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const ExtractTextPlugin = require('extract-text-webpack-plugin')

const env = process.env.NODE_ENV || 'development'
const cssLoader = [
  'style',
  'css?sourceMap&-minimize'
]

const config = {
  path: {
    public: path.join(__dirname + "/public"),
    dist: path.join(__dirname + "/dist"),
  },
  entry: {
    app: [
      './src/index.jsx'
    ],
    vendor: [
      'react-dom',
      'react',
      'redux',
      'react-redux',
      'openlayers'
    ]
  },
  env: {
    '__DEV__'      : env === 'development',
    '__PROD__'     : env === 'production',
    '__TEST__'     : env === 'test'
  },
  loaders: [
    {
      test: /\.jsx?$/,
      exclude: /(node_modules)/,
      loader: 'babel',
      query: {
        presets: ['react', 'es2015']
      }
    },
    {
      test    : /\.(scss|sass)$/,
      loaders : cssLoader.concat('sass?sourceMap')
    },
    {
      test    : /\.css$/,
      loaders : cssLoader
    },
    {
      test: /\.(png|jpg)$/,
      loader: 'url?limit=8192'
    }
  ],
  plugins: []
}

config.plugins = [
  new HtmlWebpackPlugin({
    template : path.join(config.path.public, 'index.html'),
    hash     : false,
    favicon  : path.join(config.path.public, 'favicon.ico'),
    filename : 'index.html',
    inject   : 'body',
    minify   : {
      collapseWhitespace : config.env.__PROD__
    }
  })
]

if (config.env.__PROD__) {
  config.plugins.push(new webpack.optimize.OccurrenceOrderPlugin())
  config.plugins.push(new webpack.optimize.DedupePlugin())
  config.plugins.push(
    new webpack.optimize.UglifyJsPlugin({
      compress : {
        unused    : true,
        dead_code : true,
        warnings  : false
      }
    })
  )
  config.plugins.push(
    new ExtractTextPlugin('[name].[contenthash].css', {
      allChunks : true
    })
  )
  config.loaders.filter((loader) =>
    loader.loaders && loader.loaders.find((name) => /css/.test(name.split('?')[0]))
  ).forEach((loader) => {
    const first = loader.loaders[0]
    const rest = loader.loaders.slice(1)
    loader.loader = ExtractTextPlugin.extract(first, rest.join('!'))
    delete loader.loaders
  })

} else {
  config.entry.app.push('webpack-hot-middleware/client?path=/__webpack_hmr')
  config.plugins.push(
    new webpack.optimize.CommonsChunkPlugin({
      names : ['vendor']
    })
  )
  config.plugins.push(new webpack.NoErrorsPlugin())
  config.plugins.push(new webpack.HotModuleReplacementPlugin())
}

console.log(config)

module.exports = {
  target: 'web',
  entry: config.entry,
  output: {
    path: config.path.dist,
    filename: '[name].[hash].js',
    publicPath: '/'
  },
  devtool: "source-map",
  plugins: config.plugins,
  resolve: {
    extensions: ["", ".js", ".jsx"]
  },
  module:{
    loaders: config.loaders
  },
  devServer : {
    inline : true,
    colors: true,
    debug: true,
    open: true,
    hot: true,
    watchOptions: {
      aggregateTimeout: 300,
      poll: 1000
    },
    stats: {
      colors: true
    },
    contentBase: config.path.dist
  },
  progress: true,
  colors: true,
  watch: false
}
