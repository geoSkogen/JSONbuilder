'use strict'
var readline = require('readline')

var Commands = require('./commands.js')
var Cli = require('./cli.js')
var JSONBuilder = require('./JSONBuilder.js')
var DataObject = require('./dataObject.js')

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
