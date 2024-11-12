const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin'); // Import the plugin

module.exports = {
    entry: './src/index.js',
    output: {
        path: path.resolve(__dirname, 'build'),
        filename: 'bundle.js',
        publicPath: '/',
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
        }),
        new CopyWebpackPlugin({
            patterns: [
                { from: 'public', to: '', filter: async (resourcePath) => !resourcePath.endsWith('index.html') },
            ],
        }),
    ],
    devServer: {
        port: 3001,
        static: {
            directory: path.join(__dirname, 'build'),  // Serve static files from 'build' folder
          },
        hot: true,
        historyApiFallback: {
            index: '/index.html', // Ensure routing always goes to index.html
        } 
      },
      resolve: {
        extensions: ['.js', '.jsx', '.json']
      }
}