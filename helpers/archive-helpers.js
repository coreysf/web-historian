var fs = require('fs');
var path = require('path');
var _ = require('underscore');
var request = require("request");


/*
 * You will need to reuse the same paths many times over in the course of this sprint.
 * Consider using the `paths` object below to store frequently used file paths. This way,
 * if you move any files, you'll only need to change your code in one place! Feel free to
 * customize it in any way you wish.
 */

exports.paths = {
  siteAssets: path.join(__dirname, '../web/public'),
  archivedSites: path.join(__dirname, '../archives/sites'),
  list: path.join(__dirname, '../archives/sites.txt')
};

// Used for stubbing paths for tests, do not modify
exports.initialize = function(pathsObj) {
  _.each(pathsObj, function(path, type) {
    exports.paths[type] = path;
  });
};

// The following function names are provided to you to suggest how you might
// modularize your code. Keep it clean!

exports.readListOfUrls = function(cb) {
  fs.readFile(exports.paths.list, 'utf8', function(err, data) {
    if (err) {
      throw err;
    }
    var arr = data.split("\n");
    cb(arr);
  });

};


exports.isUrlInList = function(url, cb) {
  exports.readListOfUrls(function(urls) {
    var inList = _.contains(urls, url);
    cb(inList);
  });
};

exports.addUrlToList = function(url, cb) {
  exports.isUrlInList(url, function(hasItem) {
    if (!hasItem) {
      exports.readListOfUrls(function(urls) {
        urls = urls.concat(url);
        fs.writeFile(exports.paths.list, urls.join('\n'), function(error) {
          if (error){
            throw error;
          }
        });
      });
    }
    if (cb){
      cb();
    }
  });
};

exports.isUrlArchived = function(url, cb) {
  var file = exports.paths.archivedSites + '/' + url;
  fs.readFile(file, function(err, data){
    var hasFile = true;
    if (err) {
      hasFile = false;
    }
    cb(hasFile);
  });
};

exports.downloadUrls = function() {
  exports.readListOfUrls(function(arr) {
    _.each(arr, function(url) {
      exports.isUrlArchived(url, function(hasFile) {
        if (!hasFile) {
          var file = exports.paths.archivedSites + '/' + url;
          var website = "http://" + url;
          request(website, function(error, res, body){
            fs.writeFile(file, body, function(err) {
              if (err){
                throw err;
              }
            });
            
          })
        }
      });
    });
  });
};
