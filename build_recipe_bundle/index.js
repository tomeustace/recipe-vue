/**
 * Expose rest endpoint which is called via app and calls webpack to create custom bundle
 */

var build = require('./build');
var jsonfile = require('jsonfile')
var express = require('express');
var cors = require('cors');
var bodyparser = require('body-parser');
var app = express();
var file = './data.json'

app.use(cors());
app.use(bodyparser.json());
 
function writeRecipeJson(json) {
  jsonfile.writeFile(file, json, function (err) {
    console.error(err)
  })
}

/** call like http://localhost:9009/generate?entity=person,stats&amount=100 
 *  This will generate 100 json blobs consisting of person and stats entities.
 */
app.post('/create-bundle', function(req, res) {
  console.log(req.body);
  writeRecipeJson(req.body);
  build.createBundle();
});

app.listen(9119);
