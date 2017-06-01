'use strict'

class ArrayBuilder {
  constructor () {
    this.currentObj = []
    this.currentInput
    this.isBuilding = []
    this.isActive = false
  }
}

ArrayBuilder.prototype.enterValuesOnly = function (string, dataObj, isNum, isNumChars, ifBool) {
  console.log("array element")
  this.currentObj = dataObj
  this.currentInput = (isNum) ? Number(string) : string
  if (isNumChars) {
    this.currentInput = string.slice(1,string.length)
  } else if (ifBool.isBool) {
    this.currentInput = ifBool.boolVal
  }
  this.currentObj.push(this.currentInput)
}

module.exports = ArrayBuilder
