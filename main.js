'use strict'
var Commands = require('./commands.js')
var Cli = require('./cli.js')
var JSONBuilder = require('./JSONBuilder.js')
var DataObject = require('./dataObject.js')

var dataObject = new DataObject()
var builder = new JSONBuilder(dataObject)
var commands1 = new Commands(builder)
var cli = new Cli(commands1)
/*var rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
})*/


/*var prompt = prompts[i]
rl.question( prompt  + "\r\n", (answer) => {
  cli.JSCli(answer, dataObject)
})*/
var answers = ['one','_{','1','two','3','four','_}','two','[this,will,be,an,array]']
for (let i = 0; i < answers.length; i++) {
  cli.JSCli(answers[i])
}
console.log(cli.controller.backlog)
console.log(JSON.stringify(cli.controller.dataObj))
console.log(JSON.stringify(cli.controller.objectNest))
var current = cli.controller.buildsObject.isBuilding.pop()
console.log(JSON.stringify(current))
