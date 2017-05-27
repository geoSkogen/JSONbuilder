'use strict'

class Helper {
  constructor () {
    this.lines = [
      "JSONbuilder opens in the root JSON object",
      "the first line is a key",
      "the next line is that key's value",
      "(parse conventions: 99 - number; \"99 - string(i.e.,\"99\"); 99mm - string)",
      "and so it repeats, until you type _end",
      "JSONbuilder will then ask you for a file name",
      "--do not type file extensions; all files are .json by default--",
      "JSONbuiilder saves the file in the /product directory",
      "command: _path",
      "set new directory path for current file; data entry example: ../newdir",
      "command: _end",
      "terminates data entry, asks for file name; data entry example: newfile",
      "command: _exit",
      "exits the JSON builder without creating a file; you return to your shell",
      "command: _keys",
      "lists all keys in the current object; denotes if key is an array[] or object{}",
      "command: _{ ",
      "starts a new (child) object; data entry commences with key line, then value line",
      "command: _}",
      "closes child object and resumes key/value line data entry on parent object",
      "command: _[",
      "starts a new (child) array; data entry is repeating indexed values",
      "command: _]",
      "closes child array and resumes key/value line data entry on parent object"
    ]
  }
}

Helper.prototype.getHelp = function () {
  var lineArr = this.lines
  for (var i = 0; i < lineArr.length; i++) {
    if (i >= 6 && i%2 != 0) {
      console.log(lineArr[i] + "\r\n")
    } else {
      console.log(lineArr[i])
    }
  }
}

module.exports = Helper
