'use strict'

class Helper {
  constructor () {
    this.lines = [
      "JSONbuilder opens in the root JSON object",
      "the first line is a key",
      "the next line is that key's value",
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
      "command: _{ ",
      "starts a new (child) object; data entry commences with key line, then value line",
      "command: _}",
      "closes child object and resumes key/value line data entry on parent object",
      "command: _[",
      "starts a new (child) array; data entry is repeating indexed values",
      "command: _]",
      "closes child array and resumes key/value line data entry on parent object"
    ]
    this.introLenth = 6
  }
}

Helper.prototype.getHelp = function () {
  var lineArr = this.lines
  var whereCommandsBegin = this.introLength
  for (var i = 0; i < lineArr.length; i++) {
    if (i >= whereCommandsBegin) {
      console.log("+")
      console.log(lineArr[i] + "\r\n")
      console.log("+")
    } else {
      console.log(lineArr[i])
    }
  }
}

module.exports = Helper
