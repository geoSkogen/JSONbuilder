'use strict'
var Commands = require('./commands.js')
var Cli = require('./cli.js')
var JSONBuilder = require('./JSONBuilder.js')
var DataObject = require('./dataObject.js')

var dataObject = new DataObject()
var builder = new JSONBuilder()
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
var answers = ["key:", "_{", "key:", "val", "_}", "key:", "_[", '1','2','3','4','5', "_]","_end"]
for (let i = 0; i < answers.length; i++) {
  cli.JSCli(answers[i], dataObject)
}
console.log(cli.controller.backlog)
