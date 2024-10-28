const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
    entry: './src/index.js',
    output: {
        path: path.resolve(__dirname, 'build'),
        filename: 'bundle.js',
    },
    mode: 'development',
    module: {
        rules: [
            {
                test: /\.(js|jsx|json)$/,
                exclude: /node_modules/,
                use: {
                    loader: 'babel-loader',
                    options: {
                        presets: ['@babel/preset-env', '@babel/preset-react']
                    }
                }
            },
            {
                test: /\.(png|jpe?g|gif|svg)$/,  // Add a loader for images if needed
                use: [
                  {
                    loader: 'file-loader',
                    options: {
                      name: '[name].[hash].[ext]',
                      outputPath: 'images',
                    },
                  },
                ],
              },
            {
                test: /\.css$/,
                use: ['style-loader', 'css-loader']
            }
        ]
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: './public/index.html',
            filename: 'index.html',        // Output HTML file name
            inject: 'body', 
        })
    ],
    devServer: {
        static: {
            directory: path.join(__dirname, 'public'),  // Serve static files from 'public' folder
          },
        hot: true,
        historyApiFallback: true, 
      },
      resolve: {
        extensions: ['.js', '.jsx', '.json']
      }
}