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
	// initial values for front and back set. back is always the same as fullAnswer
	this.front = '';
	this.back = fullAnswer;
};

ClozeDeletedCard.prototype.updateFrontOfCard = function() {
	// replaces omitted part of full answer with ellipsis '...'
	this.front = this.fullAnswer.replace(this.omittedPart, '...');

	console.log('front: ' + this.front);
};

ClozeDeletedCard.prototype.addToDeck = function() {
	console.log(fs.existsSync('./your-cards.txt'));
};

module.exports = ClozeDeletedCard;