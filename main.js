'use strict'
var readline = require('readline')

var Commands = require('./app/commands.js')
var Cli = require('./app/cli.js')
var JSONBuilder = require('./app/JSONBuilder.js')
var DataObject = require('./app/dataObject.js')

var dataObject = new DataObject()
var builder = new JSONBuilder(dataObject)
var commands1 = new Commands(builder)
var cli = new Cli(commands1)
var rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
})

function initInput() {
  var prompt = ""
  for (let i = 0; i < builder.objectNest.length; i++) {
    prompt += ">"
  }
  rl.question( prompt  + "\r\n", (answer) => {
    if (answer == "_exit") {
      rl.close()
      dumpData()
    } else {
      cli.JSCli(answer)
      if (cli.controller.rlClose) {
        rl.close()
        return
      }
      initInput()
    }
  })
}

function dumpData() {
  console.log(cli.controller.backlog)
  console.log(JSON.stringify(cli.controller.dataObj))
  console.log(JSON.stringify(cli.controller.objectNest))
}
builder.validatesKeys.normalizeResult()
console.log("JSON Builder 0.1.0 by geoSkogen")
console.log("type _help to view commands & conventions")
initInput()

/*
var answers = ['one','_{','1','two','3','four','_}','two','_[',
  '1','2','3','4','5','6','7','8','9','_]','three',
  '_{','hello','JSONbuilder','_}','hello','parentObject','_end']
for (let i = 0; i < answers.length; i++) {
  cli.JSCli(answers[i])
}
*/


//var current = cli.controller.buildsObject.isBuilding.pop()
//console.log(JSON.stringify(current))
