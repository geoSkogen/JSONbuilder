'use strict'

var KeyValidator = require('./keyValidator.js')
var Validator = new KeyValidator()
Validator.normalizeResult()
var resultWords = Validator.isReservedJSWord("hasOwnBooty")
var resultChars = Validator.isAlphanumeric("@booty9")

//console.log("reserved word? " + resultWords)
//console.log("naming conventions followed? " + resultChars)

console.log(Validator.isValidKey("@football"))
