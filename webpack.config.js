module.exports = {
  entry: './src/index.jsx',
  output: {
    path: __dirname + "/dist",
    filename: 'bundle.js'
  },
  devtool: "source-map",
  resolve: {
    extensions: ["", ".js", ".jsx"]
  },
  module:{
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
        test: /\.sass$/,
        loaders: ["style", "css?sourceMap", "sass?sourceMap"]
      }
    ]
  },
  devServer : {
    inline : true,
    colors: true,
    debug: true,
    lazy: true
  },
  progress: true,
  colors: true,
  watch: true
}
