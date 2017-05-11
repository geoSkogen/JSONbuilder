'use strict'

class ObjectBuilder {
  constructor() {
    this.aKey = ""
    this.aValue = ""
    this.currentObj = {}
    this.isBuilding = []
  }
}

ObjectBuilder.prototype.keyValuePairs = function (string, dataObj, isKey, isNumber, isNumChars) {
  this.isBuilding.push(dataObj);
  this.currentObj = dataObj
  if (isKey) {
    this.aKey = string
  } else {
    this.aValue = (isNumber)? Number(string) : string
    this.currentObj[this.aKey] = this.aValue
  }
}

ObjectBuilder.prototype.stopKeyValuePairs = function () {
}

module.exports = ObjectBuilder
