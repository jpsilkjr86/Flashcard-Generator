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
	// set variables: contents is the stringified flashcard object.
	// numOfCards is the return value of numOfCardsInDeck() function.
	let thisCard = this;
	let contents = JSON.stringify(thisCard);
	let numOfCards = thisCard.numOfCardsInDeck('./your-cards.txt');

	// if the number of cards in the deck equals zero,
	// write / overwrite a new deck with the stringified contents.
	if (numOfCards === 0) {
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
	if (numOfCards > 0) {
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

// algorithm to make sure the user has a working deck 
BasicCard.prototype.numOfCardsInDeck = function(filePath) {
	// declare empty data variables dataStr, dataObj, dataAry
	let dataStr = '';
	let dataObj = {};
	let dataAry = [];
	let numOfCards = 0;

	// if the file doesn't exist, return 0.
	if (!(fs.existsSync(filePath))) {
		return (numOfCards = 0);
	}

	// try saving the data as a string, then JSON-parsing it directly and reading
	// the property 'front'. if everything checks out, set numOfCards = 1.
	try {
		dataStr = fs.readFileSync(filePath, 'utf8');
		dataObj = JSON.parse(dataStr);

		if (dataObj.hasOwnProperty('front')) {
			numOfCards = 1;
		}
	}
	catch (err) {
		// if the first attempt above yields an error, try splitting the data by '&&'
		// and looping through the array. increment numOfCards by 1 for each valid card
		// object. If there's any error or corrupted data, return numOfCards = 0.
		try {
			dataStr = fs.readFileSync(filePath, 'utf8');
			dataAry = dataStr.split('&&');

			for (let i = 0; i < dataAry.length; i++) {
				// JSON parse each element of the array
				dataAry[i] = JSON.parse(dataAry[i]);

				// return 0 if any data element doesn't have 'front' or 'back' properties.
				// no point in trying to read corrupted data.
				if (!dataAry[i].hasOwnProperty('front')
				 || !dataAry[i].hasOwnProperty('back')) {
					return (numOfCards = 0);
				}
				// increment by default, meaning everything is checking out so far.
				numOfCards++;
			}
		}
		catch (err) {
			numOfCards = 0;
		}
	}
	// default is to return numOfCards
	return numOfCards;
};

module.exports = BasicCard;