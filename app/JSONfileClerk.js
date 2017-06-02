'use strict'

class JSONfileClerk {
  constructor (controller) {
    this.fs = require('fs')
    this.fsX = require('fs-extra')
    this.mkdirp = require('mkdirp')
    this.dirname = './product'
    this.newObj = {}
    this.controller = controller
  }
}

JSONfileClerk.prototype.write = function (object, filename) {
  var self = this
  var string = JSON.stringify(object)
  this.fs.writeFile( self.dirname + "/" + filename + '.json', string, function(err) {
    if (err) {
      console.log(err);
    } else {
      console.log("wrote: ./product/" + filename + ".json")
    }
  });
}

JSONfileClerk.prototype.read = function (filepath) {
  var self = this
  var string = ""
  this.fs.readFile(filepath, 'utf-8', function (err, data) {
    if (err) {
      console.log(err)
    } else {
      self.controller.dataObj = self.controller.currentObj = JSON.parse(data)
      self.controller.objectNest = [self.controller.dataObj]
      self.controller.buildsObject.currentObj = self.controller.dataObj
      self.controller.buildsObject.isBuilding = [self.controller.dataObj]
    }
  })
  //console.log("rumplestiltskin gotcha!")
}

JSONfileClerk.prototype.setPath = function (string) {
  this.dirname = string
}
module.exports = JSONfileClerk
