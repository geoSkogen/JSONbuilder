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
        }
      }
    ]
  }
}

module.exports = Commands
