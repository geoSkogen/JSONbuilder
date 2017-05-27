'use strict'

class ObjectBuilder {
  constructor(dataObj) {
    this.aKey = ""
    this.aValue = ""
    this.currentObj = {dataObj}
    this.isBuilding = [dataObj]
  }
}

ObjectBuilder.prototype.keyValuePairs = function (string, dataObj, isKey, isNumber, isNumChars, ifBool) {
  var top = this.isBuilding.length - 1
  if (this.isBuilding[top] != dataObj) {
    this.isBuilding.push(dataObj)
  }
  this.currentObj = dataObj
  if (isKey) {
    this.aKey = string
  } else {
    this.aValue = (isNumber)? Number(string) : string
      if (isNumChars) {
        this.aValue = string.slice(1,string.length-1)
      } else if (ifBool.isBool) {
        this.aValue = ifBool.boolVal
      }
    this.currentObj[this.aKey] = this.aValue
  }
}

ObjectBuilder.prototype.stopKeyValuePairs = function (parentObj) {
  this.aKey = ""
  this.aValue = ""
  this.isBuilding.pop()
  this.currentObj = parentObj
}

module.exports = ObjectBuilder
