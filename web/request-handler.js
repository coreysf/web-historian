var path = require('path');
var archive = require('../helpers/archive-helpers');
// require more modules/folders here!
var http_helpers = require('./http-helpers');
var fs = require('fs')

var sendResponse = function(res, data, statusCode){
  statusCode = statusCode || 200;
  res.writeHead(statusCode, http_helpers.headers);
  res.end(data);
};

var responses = {
  "GET": function(req, res) {
    // use fs to read the HTML file
    var file = path.join(__dirname, './public/index.html');
    console.log(file);
    fs.readFile(file, 'utf8', function(err, data) {
      sendResponse(res, data);
    })
    // pass that as data to sendResponse
    
    //Then send response
    // sendResponse(res, data?);
  },
  "POST": function(req, res) {

    sendResponse(res, "yessir!", 201);
  },
  "OPTIONS": function(req, res) {
    sendResponse(res);
  }
};

exports.handleRequest = function (req, res) {
  responses.GET(req, res);
};
