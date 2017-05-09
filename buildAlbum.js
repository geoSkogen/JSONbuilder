var Album = require('./album')
var jsCli = require('./cli')

var readline = require('readline')

var rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
})

var instream = []



rl.question("title\r\n", (answer) => {
  instream.push(answer)
  rl.question("artist\r\n", (answer) => {
    instream.push(answer)
    rl.question("year\r\n", (answer) => {
      instream.push(answer)
      rl.question("label\r\n", (answer) => {
        instream.push(answer)
	var title = new Album(instream)
        rl.close()
	console.log(title.info())
      })
    })
  })
})


/*

var pop = ["good","kids","drink","big"]
var poppy = new Album(pop)
console.log(poppy.info())


*/
