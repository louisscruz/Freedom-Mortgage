// @AngularClass

/*
 * Helper: root(), and rootDir() are defined at the bottom
 */
var path = require('path');
// Webpack Plugins
var ProvidePlugin = require('webpack/lib/ProvidePlugin');
var DefinePlugin = require('webpack/lib/DefinePlugin');
var CommonsChunkPlugin = require('webpack/lib/optimize/CommonsChunkPlugin');
var CopyWebpackPlugin = require('copy-webpack-plugin');
var HtmlWebpackPlugin = require('html-webpack-plugin');
var ENV = process.env.ENV = process.env.NODE_ENV = 'development';
const autoprefixer = require('autoprefixer');

var metadata = {
    title: 'Freedom Mortgage',
    baseUrl: '/',
    host: 'localhost',
    port: 3000,
    ENV: ENV
};
/*
 * Config
 */
module.exports = {
    // static data for index.html
    metadata: metadata,
    // for faster builds use 'eval'
    devtool: 'source-map',
    debug: true,

    entry: {
        'polyfills': './src/polyfills.ts',
        'main': './src/main.ts' // our angular app
    },

    // Config for our build files
    output: {
        path: root('dist'),
        filename: '[name].bundle.js',
        sourceMapFilename: '[name].map',
        chunkFilename: '[id].chunk.js'
    },

    resolve: {
        // ensure loader extensions match
        extensions: ['', '.ts', '.js', '.json', '.css', '.scss', '.html'] // <-- include .scss
    },

    module: {
        preLoaders: [{ test: /\.ts$/, loader: 'tslint-loader', exclude: [/node_modules/] }],
        loaders: [
            // Support for .ts files.
            {
                test: /\.ts$/,
                loader: 'ts-loader',
                exclude: [/\.(spec|e2e)\.ts$/]
            },

            // Support for *.json files.
            { test: /\.json$/, loader: 'json-loader' },

            // Support for CSS as raw text
            { test: /\.css$/, loader: 'raw-loader' },

            // support for .html as raw text
            { test: /\.html$/, loader: 'raw-loader', exclude: [ root('src/index.html') ] },

            // if you add a loader include the resolve file extension above

            { test: /.scss$/, exclude: /node_modules/, loaders: ['raw-loader','sass-loader'] },

            { test: /\.(woff2?|ttf|eot|svg)$/, loader: 'url?limit=10000' },

            // Bootstrap 4
            { test: /bootstrap\/dist\/js\/umd\//, loader: 'imports?jQuery=jquery' },

            // Load font awesome
            { test: /\.woff(2)?(\?v=[0-9]\.[0-9]\.[0-9])?$/, loader: "url-loader?limit=10000&mimetype=application/font-woff" },
            { test: /\.(ttf|eot|svg)(\?v=[0-9]\.[0-9]\.[0-9])?$/, loader: "file-loader" }
        ]
    },

    // sassResources: path.resolve(__dirname, "./node_modules/bootstrap/scss"),

    postcss: [autoprefixer], // <--- postcss

    plugins: [
        new CommonsChunkPlugin({ name: 'vendor', filename: 'vendor.bundle.js', minChunks: Infinity }),
        // static assets
        new CopyWebpackPlugin([{ from: 'src/assets', to: 'assets' }]),
        // generating html
        new HtmlWebpackPlugin({ template: 'src/index.html' }),
        // replace
        new DefinePlugin({
            'process.env': {
                'ENV': JSON.stringify(metadata.ENV),
                'NODE_ENV': JSON.stringify(metadata.ENV)
            }
        }),

        new ProvidePlugin({
          jQuery: 'jquery',
          $: 'jquery',
          jquery: 'jquery',
          "Tether": 'tether',
          "window.Tether": "tether"
        })
    ],

    // Other module loader config
    tslint: {
        emitErrors: false,
        failOnHint: false
    },
    // our Webpack Development Server config
    devServer: {
        port: metadata.port,
        host: metadata.host,
        historyApiFallback: true,
        watchOptions: { aggregateTimeout: 300, poll: 1000 }
    },
    // we need this due to problems with es6-shim
    node: { global: 'window', progress: false, crypto: 'empty', module: false, clearImmediate: false, setImmediate: false }
};

// Helper functions

function root(args) {
    args = Array.prototype.slice.call(arguments, 0);
    return path.join.apply(path, [__dirname].concat(args));
}

function rootNode(args) {
    args = Array.prototype.slice.call(arguments, 0);
    return root.apply(path, ['node_modules'].concat(args));
}
