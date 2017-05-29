'use strict'

class JSONfileClerk {
  constructor () {
    this.fs = require('fs')
    this.fsX = require('fs-extra')
    this.mkdirp = require('mkdirp')
    this.dirname = './product'
  }
}

JSONfileClerk.prototype.write = function (object, filename) {
  var self = this
  var string = JSON.stringify(object)
  this.fs.writeFile( self.dirname + filename + '.json', string, function(err) {
    if (err) {
      console.log(err);
    }
  });
}

JSONfileClerk.prototype.setPath = function (string) {
  this.dirname = string
}
module.exports = JSONfileClerk
