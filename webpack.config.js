const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const fs = require('fs');

// Custom plugin to handle HTML includes
class HtmlIncludePlugin {
  apply(compiler) {
    compiler.hooks.emit.tapAsync('HtmlIncludePlugin', (compilation, callback) => {
      const htmlFiles = Object.keys(compilation.assets).filter(filename => filename.endsWith('.html'));
      
      htmlFiles.forEach(filename => {
        let content = compilation.assets[filename].source();
        
        // Replace ${require('./components/header.html')} with actual content
        const includeRegex = /\$\{require\(['"]([^'"]+)['"]\)\}/g;
        content = content.replace(includeRegex, (match, includePath) => {
          try {
            const fullPath = path.resolve(__dirname, 'src', includePath);
            if (fs.existsSync(fullPath)) {
              return fs.readFileSync(fullPath, 'utf8');
            }
          } catch (error) {
            console.warn(`Could not include ${includePath}:`, error.message);
          }
          return match; // Keep original if include fails
        });
        
        compilation.assets[filename] = {
          source: () => content,
          size: () => content.length
        };
      });
      
      callback();
    });
  }
}

module.exports = (env, argv) => {
  const isProduction = argv.mode === 'production';
  
  return {
    mode: argv.mode || 'development',
    entry: './src/js/main.js',
    output: {
      path: path.resolve(__dirname, 'dist'),
      filename: 'js/[name].[contenthash].js',
      clean: true,
      assetModuleFilename: 'assets/[name].[hash][ext]',
    },
    devServer: {
      static: {
        directory: path.join(__dirname, 'src'),
        publicPath: '/'
      },
      hot: true,
      open: true,
    },
    module: {
      rules: [
        {
          test: /\.s[ac]ss$/i,
          use: [
            isProduction ? MiniCssExtractPlugin.loader : 'style-loader',
            'css-loader',
            {
              loader: 'sass-loader',
              options: {
                implementation: require('sass'),
                sassOptions: {
                  api: 'modern-compiler',
                  outputStyle: 'compressed',
                },
              },
            },
          ],
        },
        {
          test: /\.(png|svg|jpg|jpeg|gif)$/i,
          type: 'asset/resource',
        },
      ],
    },
    plugins: [
      new HtmlWebpackPlugin({
        template: './src/index.html',
        filename: 'index.html',
      }),
      new HtmlIncludePlugin(),
      ...(isProduction ? [new MiniCssExtractPlugin({
        filename: 'css/[name].[contenthash].css',
      })] : []),
    ],
    optimization: {
      splitChunks: {
        chunks: 'all',
      },
    },
  };
};
