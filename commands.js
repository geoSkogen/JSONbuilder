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
          if (!this.controller.isKey) {
            var oneBack = this.controller.backlog.length - 2
            var lastString = this.controller.backlog[oneBack];
            this.controller.dataEntry(lastString)
          }
        }
      },
      {
        str: "_}",
        func: function () {
          console.log("return to parent object")
        }
      },
      {
        str: "_[",
        func: function () {
          console.log("instantiate array")
          if (!this.controller.isKey) {
            var oneBack = this.controller.backlog.length - 2
            this.controller.buildsArray.start(oneBack)
          } else {
            console.log("this will create a syntax error; try another command")
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
          this.controller.buildsObject.stopKeyValuePairs()
        }
      }
    ]
  }
}

module.exports = Commands
