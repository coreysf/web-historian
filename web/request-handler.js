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

var postPage = function(url, res) {
  archive.addUrlToList(url);
  archive.isUrlArchived(url, function(hasFile) {
    if (hasFile) {
      http_helpers.serveAssets(res, url, function(res, data) {
        sendResponse(res, data, 201);
      });
    } else {
      var file = path.join(__dirname, './public/loading.html');
      fs.readFile(file, 'utf8', function(err, data) {
        sendResponse(res, data);
      })
    }
  });
}

var responses = {
  "GET": function(req, res) {
    // use fs to read the HTML file
    var file = path.join(__dirname, './public/index.html');
    fs.readFile(file, 'utf8', function(err, data) {
      sendResponse(res, data);
    })
  },
  "POST": function(req, res) {
    var data = "";
      req.on('data', function(chunk) {
        data += chunk;
      });
      req.on('end', function() {
        postPage(data.slice(4), res);
      });
  },
  "OPTIONS": function(req, res) {
    sendResponse(res);
  }
};

exports.handleRequest = function (req, res) {
  var response = responses[req.method];
  if (response) {
    response(req, res);
  } else {
    sendResponse(res, '', 404);
  }
};

// this all happens within req.on('end')'s callback within POST

// add to list
// check if page is in archive
  // if it is, serve it up
  // if it's not serve wait page