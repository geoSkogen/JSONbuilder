'use strict'

class KeyValidator {
  constructor () {
    this.words = [
      "abstract arguments await boolean break byte case catch char	class	const	continue debugger	default	delete do double	else	enum	eval export	extends	false	final finally	float	for	function goto	if	implements	import in	instanceof	int	interface let	long	native	new null	package	private	protected public	return	short	static super	switch	synchronized	this throw	throws	transient	true try	typeof	var	void volatile	while	with	yield Array	Date	eval	function hasOwnProperty",
      "Infinity	isFinite	isNaN isPrototypeOf	length	Math	NaN name	Number	Object	prototype String	toString	undefined	valueOf getClass	java	JavaArray	javaClass JavaObject	JavaPackage alert	all	anchor	anchors area	assign	blur	button checkbox	clearInterval	clearTimeout	clientInformation close	closed	confirm	constructor crypto	decodeURI	decodeURIComponent	defaultStatus document	element	elements	embed embeds	encodeURI	encodeURIComponent	escape event	fileUpload	focus",
      "form forms frame innerHeight innerWidth layer	layers	link	location mimeTypes	navigate	navigator	frames frameRate	hidden	history	image images	offscreenBuffering	open	opener option	outerHeight	outerWidth	packages pageXOffset	pageYOffset	parent	parseFloat parseInt	password	pkcs11	plugin prompt	propertyIsEnum	radio	reset screenX	screenY	scroll	secure select	self	setInterval	setTimeout status	submit	taint	text textarea	top	unescape	untaint window onblur	onclick",
      "onerror	onfocus onkeydown	onkeypress	onkeyup	onmouseover onload	onmouseup	onmousedown	onsubmit"
    ]
    this.result = []
  }
}

KeyValidator.prototype.normalizeResult = function () {
  var tab = new RegExp("\t")
  var splitspace
  var splittabs

  var rawstring = ""
  var self = this
  for (var i = 0; i < self.words.length; i++) {
    rawstring += (i == 0)? self.words[i] : " " + self.words[i]
  }
  splitspace = rawstring.split(" ")
  rawstring = ""
  for (var i = 0; i < splitspace.length; i++) {
    if (tab.test(splitspace[i])) {
      splittabs = splitspace[i].split("\t")
      rawstring += (i == 0)? splittabs.join() : "," + splittabs.join()
    } else {
      rawstring += (i == 0)? splitspace[i] : "," + splitspace[i]
    }
  }
  self.result = rawstring.split(",")
 }

 KeyValidator.prototype.isReservedJSWord = function (string) {
  if (this.result.indexOf(string) != -1) {
    return true
  } else {
    return false
  }
}

KeyValidator.prototype.isAlphanumeric = function (string) {
  var char = /[^A-Za-z0-9]/
  if (Number(string.charAt(0)) || char.test(string)) {
    return false
  } else {
    return true
  }
}

KeyValidator.prototype.isValidKey = function (string) {
  if (!this.isReservedJSWord(string) && this.isAlphanumeric(string)) {
    return true
  } else {
    return false
  }
}

module.exports = KeyValidator
