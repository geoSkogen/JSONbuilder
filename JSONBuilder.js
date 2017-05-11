'use strict'

var ObjectBuilder = require('./objectBuilder.js')
var ArrayBuilder = require('./arrayBuilder.js')

class JSONBuilder {
  constructor (dataObj) {
    this.buildsObject = new ObjectBuilder()
    this.buildsArray = new ArrayBuilder()
    this.isKey = true;
    this.objectNest = []
    this.allInts
    this.numStr
    this.backlog = []
    this.dataObj = dataObj
    this.currentObj = dataObj
  }
}

JSONBuilder.prototype.dataEntry = function (input) {
  this.allInts = false;
  if (!this.isKey) {
    this.isNumeric(input)
  }
  this.buildsObject.keyValuePairs(input, this.currentObj, this.isKey, this.allInts, this.numStr)
  this.isKey = !this.isKey
}

JSONBuilder.prototype.isNumeric = function (string) {
  for (let i = 0; i < string.length; i++) {
    if (Number(string.charAt(i))) {
      this.allInts = true;
    }
  }
  if (this.allInts) {
    console.log('allInts')
  } else {
    this.numStr = false
    this.isNumberString(string)
    console.log('default to string')
  }
}

JSONBuilder.prototype.isNumberString = function (string) {
  if (string.charAt(0) === "\"") {
    for (let i = 1; i < string.length; i++) {
      if (Number(string.charAt(i))) {
        this.numStr = true;
      }
    }
    if (this.numStr) {
      console.log("number will be parsed as a string")
    } else {
      console.log("random garbage")
    }
  } else {
    console.log('default to string')
    this.numStr = false;
  }
}


module.exports = JSONBuilder
