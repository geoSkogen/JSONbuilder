(function () {
  var string = "\"999"
  var len = string.length
  var slice = string.slice(1,len)
  console.log("string: " + string + " slice: " + slice)
}).call(this)
