var readline = require('readline')

var rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
})

rl.question("what's ya faverite food?\r\n", (answer) => {
  console.log(`what's that, ${answer}? ${answer} makes your teeth go grey`)
  rl.close()
})

