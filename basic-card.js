// imports fs
var fs = require('fs');

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

BasicCard.prototype.addToDeck = function() {
	// set variables: contents is the stringified flashcard object.
	// numOfCardsInDeck is the return value of deck.numOfCards() function.
	let thisCard = this;
	let contents = JSON.stringify(thisCard);
	let numOfCardsInDeck = deck.numOfCards('./your-cards.txt');

	// if the number of cards in the deck equals zero,
	// write / overwrite a new deck with the stringified contents.
	if (numOfCardsInDeck === 0) {
		fs.writeFile('./your-cards.txt', contents, function(err) {
			if (err) {
				return console.log(err);
			}

			console.log('\nFlashcard successfully created!'
				+ '\nFront: ' + thisCard.front
				+ '\nBack: ' + thisCard.back + '\n');
		});
	}

	// if the number of cards in the deck is greater than zero,
	// *append* stringified card object with && at the front (for
	// convenience in JSON parsing later on) to the designated file.
	if (numOfCardsInDeck > 0) {
		fs.appendFile('./your-cards.txt', '&&' + contents, function(err) {
			if (err) {
				return console.log(err);
			}

			console.log('\nFlashcard successfully created!'
				+ '\nFront: ' + thisCard.front
				+ '\nBack: ' + thisCard.back + '\n');
		});
	}
};

module.exports = BasicCard;