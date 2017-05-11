'use strict'

class Commands {
  constructor(builder) {
    var self = this
    this.controller = builder
    this.router = [
      {
        str: "_{",
        func: function () {
          console.log("instantiate child object")
          if (!self.controller.isKey) {
            var oneBack = self.controller.backlog.length - 2
            var lastString = self.controller.backlog[oneBack];
            //passing true to dataEntry tells the controller to instantiate a new
            //object, assign it to the last key entered, and set it to the current object
            self.controller.dataEntry(lastString, true)
          } else {
            console.log("this will result in a syntax error; enter a key")
          }
        }
      },
      {
        str: "_}",
        func: function () {
          console.log("return to parent object")
          self.controller.returnToParentObject()
        }
      },
      {
        str: "_[",
        func: function () {
          console.log("instantiate array")
          if (!self.controller.isKey) {
            var oneBack = self.controller.backlog.length - 2
            self.controller.buildsArray.start(oneBack)
          } else {
            console.log("this will result in a syntax error; enter a key")
          }
        }
      },
      {
        str: "_]",
        func: function () {
          console.log("close array")
        }
      },
      {
        str: "_end",
        func: function () {
          console.log("wrote file")
          self.controller.buildsObject.stopKeyValuePairs()
        }
      }
    ]
  }
}

module.exports = Commands
