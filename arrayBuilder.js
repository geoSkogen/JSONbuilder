'use strict'

class ArrayBuilder {
  constructor () {
    this.currentObj = []
    this.currentInput
    this.isBuilding = []
    this.isActive
  }
}

ArrayBuilder.prototype.enterValuesOnly = function (string, dataObj, isNum, isNumChars) {
  console.log("array start")
  this.currentObj = dataObj
  this.currentInput = (isNum) ? Number(string) : string
  this.currentObj.push(this.currentInput)
}

module.exports = ArrayBuilder
