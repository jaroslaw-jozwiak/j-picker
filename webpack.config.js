const path = require('path');
const autoprefixer = require('autoprefixer');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');

module.exports = {
    mode: 'development',
    entry: {
        JPicker: './src/JPicker.ts',
        Styles: './src/JPicker.scss'
    },
    output: {
        filename: '[name].js',
        path: path.resolve(__dirname, 'dist'),
        libraryTarget: 'umd',
        library: 'JPicker',
        libraryExport: 'JPicker',
        umdNamedDefine: false,
        globalObject: 'this'
    },
    devtool: 'inline-source-map',
    devServer: {
        contentBase: './dist'
    },
    resolve: {
        extensions: ['.tsx', '.ts', '.js'],
    },
    plugins: [
        new CleanWebpackPlugin(),
    ],
    module: {
        rules: [
            {
                test: /\.tsx?$/,
                use: 'ts-loader',
                exclude: /node_modules/,
            },
            {
                test: /\.mustache$/,
                use: 'mustache-loader',
            },
            {
                test: /\.(html|txt)$/i,
                loader: 'html-loader',
            },
            {
                test: /\.less$/,
                use: [{
                        loader: 'style-loader',
                    },
                    {
                        loader: 'css-loader',
                    },
                    {
                        loader: 'less-loader',
                    },
                ]
            },
            {
                test: /\.(png|svg|jpg|gif)$/,
                use: [
                    'file-loader',
                ],
            },
            {
                test: /\.scss$/,
                use: [{
                        loader: 'file-loader',
                        options: {
                            name: 'JPicker.css',
                        },
                    },
                    { loader: 'extract-loader' },
                    { loader: 'css-loader' },
                    {
                        loader: 'postcss-loader',
                        options: {
                            plugins: () => [autoprefixer()]
                        }
                    },
                    {
                        loader: 'sass-loader',
                        options: {
                            // Prefer Dart Sass
                            implementation: require('sass'),
                            sassOptions: {
                                includePaths: ['./node_modules']
                            }
                        },
                    },
                ]
            },
            {
                test: /\.js$/,
                loader: 'babel-loader',
                options: {
                    presets: ['@babel/preset-env']
                }
            },
        ]
    }
};
