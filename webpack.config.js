const path = require('path');

module.exports = {
  entry: './src/DynamicImportLoader.tsx',
  output: {
    filename: 'index.js',
    path: path.resolve(__dirname, 'dist'),
    libraryTarget: 'commonjs2'
  },
  module: {
    rules: [{ test: /\.tsx?$/, loader: 'ts-loader' }]
  },
  externals: {
    react: 'react'
  },
  mode: 'production'
};
