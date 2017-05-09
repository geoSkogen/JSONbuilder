var JSCli = require('./cli.js')
var readline = require('readline')

/*var rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
})*/

var instream = [];

var thing1 = {
  commandString: "1",
  commandPrompts: ["l","m","n","o","p"] 
  /*    
  rl.question("title\r\n", (answer) => {
      instream.push(answer)
    }) 
  */
}

var thing2 = {
  commandString: "2",
/*
  commandMeth: function () { console.log("hello2") }
*/
  commandPrompts: ["q","r","s","t","u"] 
}

var thing3 = {
  commandString: "3",
/*
  commandMeth: function () { console.log("hello3") }
*/
  commandPrompts: ["v","w","x","y","z"] 
}

var cli = new JSCli([thing1,thing2,thing3])


cli.jsCli()