// declares BasicCard constructor
var BasicCard = function(str) {
	// checks right away to see if it's not already an instance of the constructor
	console.log(this instanceof BasicCard);
	if (!(this instanceof BasicCard)) {
		return new BasicCard(str);
	}
	
	this.hi = str;	
};

BasicCard.prototype.ask = function() {
	return console.log(this.hi);
};

module.exports = BasicCard;