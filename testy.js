(function () {
  var fs = require('fs')
  var nudata = {}


  fs.readFile('./product/example.json', 'utf-8', function (err, data) {
    if (err) {
      console.log(err)
    } else {
      nudata = JSON.parse(data)
      console.log("OK")
    }
  })
}).call(this)
