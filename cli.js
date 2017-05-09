'use strict'

var readline = require('readline')


class JSCli {
  constructor (data) {
    var self = this
    this.instream = []
    this.commandStrings = []
    this.commandFuncs = []
    this.data = data
    for (let i = 0; i < this.data.length; i++) {
      this.commandStrings[i] = this.data[i].str
      this.commandFuncs[i] = this.data[i].func
    }
    this.rl = readline.createInterface({
      input: process.stdin,
      output: process.stdout
    })
  }
}


JSCli.prototype.JSCli = function (controller, dataObj, prompt) {
  this.rl.question(prompt, (answer) => {
    if (answer == "_exit"){
      this.rl.close()
      console.log(JSON.stringify(this.instream))
    } else if (this.commandStrings.indexOf(answer) != -1) {
      this.commandFuncs[this.commandStrings.indexOf(answer)]()
    } else {
      //jscli should expect a specifically structured controller --- controlObj ---
      //for non command entry; it needs a .dataEntry method which accepts
      //the cli input string as an argument
      controller.dataEntry(answer, dataObj)
    }
  })
}

module.exports = JSCli
