// imports deck object
var deck = require('./deck.js');

// declares BasicCard constructor
var BasicCard = function(front, back) {
	// checks right away to see if it's not already an instance of the constructor
	if (!(this instanceof BasicCard)) {
		return new BasicCard(front, back);
	}

	this.front = front;
	this.back = back;
};

BasicCard.prototype.addToDeck = function(callback) {
	// set variables: contents is the stringified flashcard object,
	// numOfCardsInDeck is the return value of deck.numOfCards() function.
	let thisCard = this;
	deck.add(thisCard, callback);
};

module.exports = BasicCard;