'use strict'

class Album {
	constructor (data) {
		this.title = data[0]
		this.artist = data[1]
		this.year = data[2]
		this.label = data[3]
	}
	
}

Album.prototype.info = function () {
		return JSON.stringify(this)
	}

module.exports = Album