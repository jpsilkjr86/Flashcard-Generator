// imports fs
var fs = require('fs');

// declares ClozeDeletedCard constructor
var ClozeDeletedCard = function(fullAnswer, omittedPart) {
	// checks right away to see if it's not already an instance of the constructor
	if (!(this instanceof ClozeDeletedCard)) {
		return new ClozeDeletedCard(fullAnswer, omittedPart);
	}

	this.fullAnswer = fullAnswer;
	this.omittedPart = omittedPart;

	// front is the omittedPart of fullAnswer replaced with '...'
	// back is always the same as fullAnswer
	this.front = this.fullAnswer.replace(this.omittedPart, '...');
	this.back = fullAnswer;
};

ClozeDeletedCard.prototype.addToDeck = function() {
	console.log(fs.existsSync('./your-cards.txt'));
};

module.exports = ClozeDeletedCard;