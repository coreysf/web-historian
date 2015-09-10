var path = require('path');
var archive = require('../helpers/archive-helpers');
// require more modules/folders here!
var http_helpers = require('./http-helpers');
var fs = require('fs')

var sendResponse = function(res, data, statusCode){
  statusCode = statusCode || 200;
  res.writeHead(statusCode, http_helpers.headers);
  res.end(JSON.stringify(data));
};

// var responses = {
//   "GET": function(req, res) {
//     sendResponse(res, req.url);
//   },
//   "POST": function(req, res) {
//     sendResponse(res, data?, 201);
//   },
//   "OPTIONS": function(req, res) {
//     sendResponse(res, );
//   }
// };

exports.handleRequest = function (req, res) {
  res.end(archive.paths.list);
};