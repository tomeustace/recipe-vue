// https://github.com/shelljs/shelljs
require('shelljs/global')
env.NODE_ENV = 'production'

var config = require('./bundle.config.js')
var webpack = require('webpack')

// webpack(config, function (err, stats) {
//   //spinner.stop()
//   if (err) throw err
//   process.stdout.write(stats.toString({
//     colors: true,
//     modules: false,
//     children: false,
//     chunks: false,
//     chunkModules: false
//   }) + '\n')
// })
  


 module.exports = {

  createBundle: function() {
    console.log('awesome stuff occurring');
    webpack(config, function (err, stats) {
      //spinner.stop()
      if (err) throw err
      process.stdout.write(stats.toString({
        colors: true,
        modules: false,
        children: false,
        chunks: false,
        chunkModules: false
      }) + '\n')
    })
  }
 }

