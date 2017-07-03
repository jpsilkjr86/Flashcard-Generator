// imports fs
var fs = require('fs');

// imports BasicCard in case constructor is called incorrectly.
var BasicCard = require('./basic-card.js');

// declares ClozeCard constructor
var ClozeCard = function(fullAnswer, omittedPart) {
	// checks right away to see if it's not already an instance of the constructor
	if (!(this instanceof ClozeCard)) {
		return new ClozeCard(fullAnswer, omittedPart);
	}

	this.fullAnswer = fullAnswer;
	this.omittedPart = omittedPart;

	// input validation within the constructor in case it is not carried 
	// out on the front end. If omittedPart is not a subset of fullText...
	if (this.fullAnswer.search(this.omittedPart) === -1) {
		console.log('Error: Not a valid cloze card.'
			+ '\nThe cloze is not a subset of the full text.'
			+ '\nCreating new "Basic Flashcard"...\n');
		return new BasicCard(fullAnswer, omittedPart);
	}

	// front is the omittedPart of fullAnswer replaced with '...'
	// back is always the same as fullAnswer
	this.front = this.fullAnswer.replace(this.omittedPart, '...');
	this.back = fullAnswer;
};

ClozeCard.prototype.addToDeck = function() {
	console.log(fs.existsSync('./your-cards.txt'));
};

module.exports = ClozeCard;