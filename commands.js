'use strict'

class Commands {
  constructor(builder) {
    var self = this
    this.controller = builder
    this.router = [
      {
        str: "_{",
        func: function () {
          if (!self.controller.isKey) {
            console.log("instantiates child object")
            var lastKey = self.controller.backlog.length - 2
            var lastString = self.controller.backlog[lastKey];
            //passing true to dataEntry tells the controller
            //to instantiate a new object,
            self.controller.dataEntry(lastString, true)
          } else {
            console.log("this will result in a syntax error; enter a key")
          }
        }
      },
      {
        str: "_}",
        func: function () {
          if (self.controller.isKey && self.controller.objectNest.length > 1) {
            console.log("closes child object; returns to parent object")
            self.controller.returnToParentObject()
          } else if (!self.controller.isKey) {
            console.log("this will result in a syntax error; enter a value")
          } else if (self.controller.objectNest.length === 1) {
            console.log("enter _end to close root object")
          }
        }
      },
      {
        str: "_[",
        func: function () {
          if (!self.controller.isKey) {
            console.log("instantiates child array")
            var lastKey = self.controller.backlog.length - 2
            var lastString = self.controller.backlog[lastKey]
            self.controller.buildsArray.isActive = true
            self.controller.dataEntry(lastString, true)
          } else {
            console.log("this will result in a syntax error; enter a key")
          }
        }
      },
      {
        str: "_]",
        func: function () {
          var datum = (self.controller.isKey) ? "key" : "value"
          if (self.controller.buildsArray.isActive) {
            console.log("closes array; returns to parent object")
            self.controller.returnToParentObject()
          } else {
            console.log("no array has been instantiated; enter a " + datum)
          }
        }
      },
      {
        str: "_end",
        func: function () {
          console.log("command backlog: " + self.controller.backlog)
          console.log("wrote to file: " + JSON.stringify(self.controller.dataObj))
          console.log("enter filename -- without extension; all files will have .json extension")
          self.controller.buildsObject.stopKeyValuePairs()
          self.controller.promptedBy = "filename"
          //self.controller.rlClose = true
        }
      },
      {
        str: "_help",
        func: function () {
          /*
          console.log("JSONbuilder opens in the root JSON object")
          console.log("the first line is a key")
          console.log("the next line is that key's value")
          console.log("and so it repeats, until you type _end")
          console.log("JSONbuilder will then ask you for a file name")
          console.log("--do not type file extensions; all files are .json by default--")
          console.log("JSONbuiilder saves the file in the /product directory")
          console.log("command: _path")
          console.log("set new directory path for current file; data entry example: ../newdir")
          console.log("command: _end")
          console.log("terminates data entry, asks for file name; data entry example: newfile")
          console.log("command: _exit")
          console.log("exits the JSON builder without creating a file; you return to your shell")
          console.log("command: _{ ")
          console.log("starts a new (child) object; data entry commences with key line, then value line")
          console.log("command: _}")
          console.log("closes child object and resumes key/value line data entry on parent object")
          console.log("command: _[")
          console.log("starts a new (child) array; data entry is repeating indexed values")
          console.log("command: _]")
          console.log("closes child array and resumes key/value line data entry on parent object")
          */
          self.controller.getsHelp.getHelp()
        }
      }
    ]
    this.prompter =
    [
      {
        str: "filename",
        func: function (string) {
          console.log("wrote: ./product/" + string + ".json")
          self.controller.servesFiles.write(self.controller.dataObj, string)
        }
      }
    ]
  }
}

module.exports = Commands
