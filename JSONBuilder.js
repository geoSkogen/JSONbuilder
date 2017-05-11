'use strict'

var ObjectBuilder = require('./objectBuilder.js')
var ArrayBuilder = require('./arrayBuilder.js')

class JSONBuilder {
  constructor (dataObj) {
    this.buildsObject = new ObjectBuilder()
    this.buildsArray = new ArrayBuilder()
    this.isKey = true
    this.lastKey= ""
    this.allInts
    this.numStr
    this.backlog = []
    this.dataObj = dataObj
    this.currentObj = dataObj
    this.objectNest = [dataObj]
  }
}

JSONBuilder.prototype.dataEntry = function (input, newChild) {
  this.allInts = false;
  if (!this.isKey) {
    this.isNumeric(input)
    if (newChild) {
      this.currentObj = this.currentObj[input] = {}
      this.objectNest.push(this.currentObj)
      this.isKey = true
      return
    }
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

JSONBuilder.prototype.returnToParentObject = function () {
  var oneBack
  this.objectNest.pop()
  oneBack = this.objectNest.length - 1
  this.currentObj = this.objectNest[oneBack]
  this.buildsObject.stopKeyValuePairs(this.currentObj)
  this.isKey = true
}


module.exports = JSONBuilder
