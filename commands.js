'use strict'

class Commands {
  constructor(JSONBuilder) {
    var builder = JSONBuilder
    this.JSONrouter = [
      {
        str: "_{",
        func: function () {
          builder.record.backlog.push("_{")
          console.log(JSON.stringify(builder.record.backlog))
        }
      },
      {
        str: "_}",
        func: function () {
          builder.record.backlog.push("_}")
          console.log(JSON.stringify(builder.record.backlog))
        }
      },
      {
        str: "_[",
        func: function () {
          builder.record.backlog.push("_[")
          console.log(JSON.stringify(builder.record.backlog))
        }
      },
      {
        str: "_]",
        func: function () {
          builder.record.backlog.push("_]")
          console.log(JSON.stringify(builder.record.backlog))
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
