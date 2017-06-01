'use strict'

var ObjectBuilder = require('./objectBuilder.js')
var ArrayBuilder = require('./arrayBuilder.js')
var JSONfileClerk = require('./JSONfileClerk.js')
var Helper = require('./helper.js')
var KeyValidator = require('./keyValidator.js')

class JSONBuilder {
  constructor (dataObj) {
    var self = this
    this.buildsObject = new ObjectBuilder(dataObj)
    this.buildsArray = new ArrayBuilder()
    this.servesFiles = new JSONfileClerk(self)
    this.getsHelp = new Helper()
    this.validatesKeys = new KeyValidator()
    this.isKey = true
    this.lastKey= ""
    this.lastObj = {}
    this.allInts
    this.numStr
    this.ifBool = {}
    this.backlog = []
    this.dataObj = dataObj
    this.currentObj = dataObj
    this.objectNest = [dataObj]
    this.keyToCurrent = "(root JSON object)"
    this.currentKeys = []
    this.currentDataTypes = []
    this.rlClose = false
    this.promptedBy = ""
  }
}

JSONBuilder.prototype.dataEntry = function (input, newChild) {
  this.allInts = false;
  if (this.buildsArray.isActive) {
    this.isKey = false
    this.isBoolean(input)
    this.isNumeric(input)
    if (newChild) {
      this.currentObj = this.currentObj[input] = []
      this.objectNest.push(this.currentObj)
      return
    }
    this.buildsArray.enterValuesOnly(input, this.currentObj, this.allInts, this.numStr, this.ifBool)
  } else {
    if (!this.isKey) {
      this.isBoolean(input)
      this.isNumeric(input)
      if (newChild) {
        this.currentObj = this.currentObj[input] = {}
        this.objectNest.push(this.currentObj)
        this.isKey = true
        return
      }
    }
    if (this.validatesKeys.isValidKey(input) || !this.isKey) {
      this.buildsObject.keyValuePairs(input, this.currentObj, this.isKey, this.allInts, this.numStr, this.ifBool)
      this.isKey = !this.isKey
    } else {
      console.log("key contains invalid characters or reserved words, try another key")
    }
  }
}

JSONBuilder.prototype.isBoolean = function (string) {
  if (string == "_true") {
    this.ifBool.isBool = true
    this.ifBool.boolVal = true
    console.log("boolean evaluates to true")
  } else if (string == "_false") {
    this.ifBool.isBool = true
    this.ifBool.boolVal = false
    console.log("boolean evaluates to false")
  } else {
    this.ifBool.isBool = false
    this.ifBool.boolVal = null
  }
}


JSONBuilder.prototype.isNumeric = function (string) {
  var isIntCount = 0
  for (let i = 0; i < string.length; i++) {
    if (Number(string.charAt(i)) || string.charAt(i) == ".") {
      isIntCount++
    }
  }
  if (isIntCount === string.length) {
    this.allInts = true
  }
  if (this.allInts) {
    console.log('number will be parsed as an integer/float')
  } else {
    this.numStr = false
    this.isNumberString(string)
    if (!this.ifBool.isBool) {
      console.log("default to string")
    }
  }
}

JSONBuilder.prototype.isNumberString = function (string) {
  var isIntCount = 0
  if (string.charAt(0) === "\"") {
    for (let i = 1; i < string.length; i++) {
      if (Number(string.charAt(i)) || string.charAt(i) == ".") {
        isIntCount++
      }
    }
    if (isIntCount === string.length - 1) {
      this.numStr = true
    }
    if (this.numStr) {
      console.log("number will be parsed as a numeric character string")
    } else {
      if (!this.ifBool.isBool) {
        console.log("default to string")
      }
    }
  } else {
    //console.log('default to string')
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
  if (this.objectNest.length == 1) {
    this.keyToCurrent = "(root JSON object)"
  }
}

JSONBuilder.prototype.promptedEntry = function (string) {
  console.log('filename ' + string)
}

JSONBuilder.prototype.getKeyDataTypes = function () {
  var self = this
  var subKeyArr = []
  var keyArr = Object.keys(this.currentObj)
  var dataTypeArr = []
  var newKeyArr = []

  for (var i = 0; i < keyArr.length; i++) {
    if (typeof self.currentObj[keyArr[i]] == "object") {
      if (self.currentObj[keyArr[i]].length) {
        dataTypeArr.push("array")
        newKeyArr[i] = keyArr[i] + "[]"
      } else {
        dataTypeArr.push("object")
        newKeyArr[i] = keyArr[i] + "{}"
      }
    } else {
      dataTypeArr.push(typeof self.currentObj[keyArr[i]])
      if (dataTypeArr[dataTypeArr.length-1] == "string") {
        newKeyArr[i] = keyArr[i] + " $"
      } else if (dataTypeArr[dataTypeArr.length-1] == "number") {
        newKeyArr[i] = keyArr[i] + " #"
      } else if (dataTypeArr[dataTypeArr.length-1] == "boolean") {
        newKeyArr[i] = keyArr[i] + "||"
      } else {
        newKeyArr[i] = keyArr[i] + "?"
        console.log("weird data!")
      }
    }
  }
  this.currentKeys = keyArr
  this.currentDataTypes = dataTypeArr
  return newKeyArr
}

JSONBuilder.prototype.keyChange = function (string) {
  var self = this
  this.getKeyDataTypes()
  var keyIndex = this.currentKeys.indexOf(string)
  var currentType = ""
  if (keyIndex != -1) {
    currentType = this.currentDataTypes[keyIndex]
    console.log(string + " makes your teeth go gray")
    if (currentType == "object" || currentType == "array") {
      this.keyToCurrent = string
      console.log("editing child " + currentType + " " + string + " in " + this.keyToCurrent)
      if (currentType == "array") {
        self.currentObj = self.currentObj[self.keyToCurrent]
        self.objectNest.push(self.currentObj[self.keyToCurrent])
        self.buildsArray.isActive = true
      } else {
        self.currentObj = self.currentObj[self.keyToCurrent]
        self.objectNest.push(self.currentObj[self.keyToCurrent])
      }
    } else {
      console.log("overwriting " + currentType + " " + string  + " in " + this.keyToCurrent)
      this.isKey = true
      this.dataEntry(string, false)
    }
  } else {
    console.log(string + " is not a key in the current scope")
  }
}

JSONBuilder.prototype.loadObj = function (string) {
  this.servesFiles.read(string)
}


module.exports = JSONBuilder
