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
          self.controller.getsHelp.getHelp()
        }
      },
      {
        str: "_keys",
        func: function () {
          console.log(self.controller.getKeyDataTypes())
        }
      },
      {
        str: "_key",
        func: function () {
          console.log("enter key")
          self.controller.promptedBy = "keyname"
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
      },
      {
        str: "keyname",
        func: function (string) {
          self.controller.keyChange(string)
        }
      }
    ]
  }
}

module.exports = Commands
