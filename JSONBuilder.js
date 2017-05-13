'use strict'

var ObjectBuilder = require('./objectBuilder.js')
var ArrayBuilder = require('./arrayBuilder.js')
var JSONfileClerk = require('./JSONfileClerk.js')

class JSONBuilder {
  constructor (dataObj) {
    this.buildsObject = new ObjectBuilder(dataObj)
    this.buildsArray = new ArrayBuilder()
    this.servesFiles = new JSONfileClerk()
    this.isKey = true
    this.lastKey= ""
    this.lastObj = {}
    this.allInts
    this.numStr
    this.backlog = []
    this.dataObj = dataObj
    this.currentObj = dataObj
    this.objectNest = [dataObj]
    this.rlClose = false
    this.promptedBy = ""
  }
}

JSONBuilder.prototype.dataEntry = function (input, newChild) {
  this.allInts = false;
  if (this.buildsArray.isActive) {
    this.isKey = false
    this.isNumeric(input)
    if (newChild) {
      this.currentObj = this.currentObj[input] = []
      this.objectNest.push(this.currentObj)
      return
    }
    this.buildsArray.enterValuesOnly(input, this.currentObj, this.allInts, this.numStr)
  } else {
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
}


JSONBuilder.prototype.isNumeric = function (string) {
  var isIntCount = 0
  for (let i = 0; i < string.length; i++) {
    if (Number(string.charAt(i))) {
      isIntCount++
    }
  }
  if (isIntCount === string.length) {
    this.allInts = true
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
  var isIntCount = 0
  if (string.charAt(0) === "\'") {
    for (let i = 1; i < string.length; i++) {
      if (Number(string.charAt(i))) {
        isIntCount++
      }
    }
    if (isIntCount === string.length - 1) {
      this.numStr = true
    }
    if (this.numStr) {
      console.log("number will be parsed as a string")
    } else {
      console.log("noise")
    }
  } else {
    console.log('default to string')
    this.numStr = false;
  }
}

JSONBuilder.prototype.returnToParentObject = function () {
  var parentIndex
  var testObj
  this.lastObj = this.objectNest.pop()
  parentIndex = this.objectNest.length - 1
  this.currentObj = this.objectNest[parentIndex]
  if (!this.buildsArray.isActive) {
    this.buildsObject.stopKeyValuePairs(this.currentObj)
  }
  testObj = this.currentObj
  if (Array.isArray(testObj)) {
    this.buildsArray.isActive = true
  } else {
    this.buildsArray.isActive = false
  }
  this.isKey = true
}

JSONBuilder.prototype.promptedEntry = function (string) {
  console.log('filename ' + string)
}

module.exports = JSONBuilder
