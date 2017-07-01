// imports fs
var fs = require('fs');

// declares BasicCard constructor
var BasicCard = function(front, back) {
	// checks right away to see if it's not already an instance of the constructor
	if (!(this instanceof BasicCard)) {
		return new BasicCard(front, back);
	}

	this.front = front;
	this.back = back;
};

BasicCard.prototype.addToDeck = function() {
	console.log(fs.existsSync('./your-cards.txt'));
};

module.exports = BasicCard;