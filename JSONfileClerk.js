'use strict'

class JSONfileClerk {
  constructor () {
    this.fs = require('fs')
    this.fsX = require('fs-extra')
    this.mkdirp = require('mkdirp')
  }
}

JSONfileClerk.prototype.write = function (object, filename) {
  var string = JSON.stringify(object)
  this.fs.writeFile('./' + filename + '.json', string, function(err) {
    if (err) {
      console.log(err);
    }
  });
}
module.exports = JSONfileClerk
