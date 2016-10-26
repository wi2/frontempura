module.exports = {
  entry: './src/app.js',
  output: {
    path: './bin',
    filename: 'app.bundle.js'
  },
  devtool: "source-map",
  module:{
    loaders: [
      {
        test: /\.js$/,
        exclude: /(node_modules)/,
        loader: 'babel',
        query: {
          presets: ['react','sass', 'es2015']
        }
      },
      {
        test: /\.sass$/,
        loaders: ["style", "css?sourceMap", "sass?sourceMap"]
      }
    ]
  }
}
