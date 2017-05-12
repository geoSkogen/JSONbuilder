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
          console.log("close child object; return to parent object")
          self.controller.returnToParentObject()
        }
      },
      {
        str: "_[",
        func: function () {
          console.log("instantiate array")
          if (!self.controller.isKey) {
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
          console.log("close array; return to parent object")
          self.controller.returnToParentObject()
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
