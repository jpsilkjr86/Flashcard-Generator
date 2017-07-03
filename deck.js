// imports fs
var fs = require('fs');

// declares deck object
var deck = {
	// algorithm that returns the number of cards in the user's deck
	numOfCards: function(filePath) {
		// returns the length of returned array from deck.getCards()
		let cardsAry = deck.getCards(filePath);
		console.log(cardsAry.length);
		return cardsAry.length;
	},
	// algorith that returns an array of flashcard objects in designated filePath
	getCards: function(filePath) {
		// declares variables with empty values
		let dataStr = '';
		let dataAry = [];

		// returns empty array if the filepath doesn't exist
		if (!fs.existsSync(filePath)) {
			return (dataAry = []);
		}

		// sets dataStr equal to contents of filePath and dataAry equal to dataStr
		// split at '&&'. .split works regardless if the file can find '&&' or not.
		dataStr = fs.readFileSync(filePath, 'utf8');
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