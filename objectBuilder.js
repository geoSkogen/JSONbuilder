'use strict'

class ObjectBuilder {
  constructor() {
    this.isBuilding
    this.aKey = ""
    this.aValue = ""
    this.currentObj = {}
  }
}

ObjectBuilder.prototype.keyValuePairs = function (string, dataObj, isKey, isNumber, isNumChars) {
  this.isBuilding = true
  this.currentObj = dataObj
  if (isKey) {
    this.aKey = string
  } else {
    this.aValue = string
    this.currentObj[this.aKey] = this.aValue
  }
}

ObjectBuilder.prototype.quit = function () {
  isBuilding = false;
}

module.exports = ObjectBuilder
