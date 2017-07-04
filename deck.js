// imports fs
var fs = require('fs');

// declares deck object
var deck = {
	// filepath of flashcard deck
	filepath: './your-cards.txt',
	// method for adding a card to the deck
	add: function(cardObject, callback) {
		// sets variables: contents is stringified card object,
		// numOfCardsInDeck comes from deck.numOfCards()
		let contents = JSON.stringify(cardObject);
		let numOfCardsInDeck = deck.numOfCards();

		// if the number of cards in the deck equals zero,
		// writes / overwrites a new deck with the stringified contents.
		if (numOfCardsInDeck === 0) {
			fs.writeFile(this.filepath, contents, function(err) {
				if (err) {
					return console.log(err);
				}

				console.log('\nFlashcard successfully created!'
					+ '\nFront: ' + cardObject.front
					+ '\nBack: ' + cardObject.back + '\n');

				callback();
			});
		}

		// if the number of cards in the deck is greater than zero,
		// *appends* stringified card object with && at the front (for
		// convenience in JSON parsing later on) to the designated file.
		if (numOfCardsInDeck > 0) {
			fs.appendFile(this.filepath, '&&' + contents, function(err) {
				if (err) {
					return console.log(err);
				}

				console.log('\nFlashcard successfully created!'
					+ '\nFront: ' + cardObject.front
					+ '\nBack: ' + cardObject.back + '\n');

				callback();
			});
		}
	}, // end of deck.add()
	// algorithm that returns the number of cards in the user's deck
	numOfCards: function() {
		// returns the length of returned array from deck.getCards()
		let cardsAry = deck.getCards();
		return cardsAry.length;
	},
	// algorith that returns an array of flashcard objects
	getCards: function() {
		// declares variables with empty values
		let dataStr = '';
		let dataAry = [];

		// returns empty array if the filepath doesn't exist
		if (!fs.existsSync(this.filepath)) {
			return (dataAry = []);
		}

		// sets dataStr equal to contents of filepath and dataAry equal to dataStr
		// split at '&&'. .split works regardless if the file can find '&&' or not.
		dataStr = fs.readFileSync(this.filepath, 'utf8');
		dataAry = dataStr.split('&&');

		// tries splitting array, looping through it and JSON-parsing each object within it.
		// If loop finds data that is missing or corrupted, it will throw an error.
		try {
			for (let i = 0; i < dataAry.length; i++) {

				dataAry[i] = JSON.parse(dataAry[i]);

				// throws an error if any data element doesn't have 'front' or 'back' properties.
				if (!(dataAry[i].hasOwnProperty('front') && dataAry[i].hasOwnProperty('back'))) {
					throw 'Deck data does not exist and/or has been corrupted.';
				}
			}
		}
		// if any error occured above, dataAry will be an empty array.
		catch (err) {
			dataAry = [];
		}
		finally {
			return dataAry;
		}
	} // end of deck.getCards()
};

module.exports = deck;