'use strict'

//var readline = require('readline')

class JSCli {
  constructor (commands) {
    var self = this
    this.commands = commands.router
    this.controller = commands.controller
    this.prompts = commands.prompter
    this.instream = []
    this.commandStrings = []
    this.commandFuncs = []
    this.promptStrings = []
    this.promptFuncs = []
    for (let i = 0; i < this.commands.length; i++) {
      this.commandStrings[i] = this.commands[i].str
      this.commandFuncs[i] = this.commands[i].func
    }
    for (let i = 0; i < this.prompts.length; i++) {
      this.promptStrings[i] = this.prompts[i].str
      this.promptFuncs[i] = this.prompts[i].func
    }
    /*this.rl = readline.createInterface({
      input: process.stdin,
      output: process.stdout
    })*/
  }
}


JSCli.prototype.JSCli = function (answer) {
  this.controller.backlog.push(answer)
  if (this.commandStrings.indexOf(answer) != -1) {
    this.commandFuncs[this.commandStrings.indexOf(answer)]()
  } else if (this.promptStrings.indexOf(this.controller.promptedBy) != -1) {
    this.promptFuncs[this.promptStrings.indexOf(this.controller.promptedBy)](answer)
  } else {
    //jscli should expect a specifically structured controller
    //for non command entry; it needs a .dataEntry method which accepts
    //the cli input string as an argument, plus a Boolean value
    this.controller.dataEntry(answer, false)
    //passing false to dataEntry tells the controller to continue assigning values
    //to keys in the current object
  }
}

module.exports = JSCli
