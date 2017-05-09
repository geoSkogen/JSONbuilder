'use strict'

class Thing {
  constructor () {
    var self = this
    this.meths = [
	 function () {self.title()},
	 function () {self.artist()},
         function () {self.year()},
	 function () {self.label()}	
     ]
  }
}

Thing.prototype.title =  function () { console.log("title") }
Thing.prototype.artist =  function () { console.log("artist") }
Thing.prototype.year =  function () { console.log("year") }
Thing.prototype.label =  function () { console.log("label") }

Thing.prototype.doMeths = function () { 
	for (var i = 0; i < this.meths.length; i++) {
          this.meths[i]()
        }
    }
var thisThing = new Thing()

thisThing.doMeths()

