var libraryName = 'recipevue';
var outputFile = libraryName + '.js';
var webpack = require('webpack')
var jsonfile = require('jsonfile')

var recipe = 'abc';

function loadRecipe() {
  var file = './data.json'
  var output = jsonfile.readFileSync(file); 
  console.log('file ' + output);
  return output;
}

module.exports = {
    entry: {
      main:"./../src/lib/create.js",
      data:"./data.json"
    },
    output: {
        path: __dirname + '/lib',
        filename: outputFile,
        library: libraryName,
        libraryTarget: 'var',
        umdNamedDefine: true
    },
    module: {
        loaders: [{
            test: /\.js$/,
            exclude: /node_modules/,
            loader: 'babel',
            query: {
                presets: ['es2015'],
            }
        }, {
            test: /\.json$/,
            loader: 'json'
        }]
    },
  plugins: [
    new webpack.DefinePlugin({
      __RECIPE__: loadRecipe()
    })
  ]
};
