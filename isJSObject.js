
(function () {

var testObj = {
  color: "blue",
  number: 22,
  array: ["drowning","in","oil"],
  object: { key: "value" },
  boolean: true,
  food: "shooshee"
}
var subKeyArr = []
var keyArr = Object.keys(testObj)
//var dataTypeArr = []
var newKeyArr = []

for (var i = 0; i < keyArr.length; i++) {
  subKeyArr = []
  subKeyArr = Object.keys(testObj[keyArr[i]])
  if (!testObj[keyArr[i]].length) {
    //console.log(keyArr[i] + " is either a bool, a number, or a JSobject " + subKeyArr)
    if (subKeyArr.length) {
      //console.log(keyArr[i] + " is a JSobject")
      //dataTypeArr[i] = "O"
      newKeyArr[i] = keyArr[i] + "{}"
    } else {
      //console.log(keyArr[i] + " is either a bool or a number")
      //dataTypeArr[i] = "B||N"
      newKeyArr[i] = keyArr[i]
    }
  } else {
    //console.log(keyArr[i] + " is either a string or an array")
    if (Array.isArray(testObj[keyArr[i]])) {
      //dataTypeArr[i] = "A"
      newKeyArr[i] = keyArr[i] + "[]"
    } else {
      //dataTypeArr[i] = "S"
      newKeyArr[i] = keyArr[i]
    }
  }
}


console.log(dataTypeArr)
console.log(newKeyArr)
}).call(this)

//Object.keys returns an array of index strings when passed an array or a string
//if passed a boolean or a number, it returns an empty array

//to isolate only the javaScript objects in the JSON object:
//using if (!testObj.property.length) sorts out the strings and arrays
//using if (!Object.keys(testObj.property).length) sorts out the numbers and booleans
