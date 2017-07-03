// imports fs
var fs = require('fs');

// declares deck object
var deck = {
	// algorithm to make sure the user has a working deck 
	numOfCards: function(filePath) {
		// declare empty data variables dataStr, dataObj, dataAry
		let dataStr = '';
		let dataObj = {};
		let dataAry = [];
		let totalCards = 0;

		// if the file doesn't exist, return 0.
		if (!(fs.existsSync(filePath))) {
			return (totalCards = 0);
		}

		// try saving the data as a string, then JSON-parsing it directly and reading
		// the property 'front'. if everything checks out, set totalCards = 1.
		try {
			dataStr = fs.readFileSync(filePath, 'utf8');
			dataObj = JSON.parse(dataStr);

			if (dataObj.hasOwnProperty('front')) {
				totalCards = 1;
			}
		}
		catch (err) {
			// if the first attempt above yields an error, try splitting the data by '&&'
			// and looping through the array. increment totalCards by 1 for each valid card
			// object. If there's any error or corrupted data, return totalCards = 0.
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
						return (totalCards = 0);
					}
					// increment by default, meaning everything is checking out so far.
					totalCards++;
				}
			}
			catch (err) {
				totalCards = 0;
			}
		}
		// default is to return totalCards
		return totalCards;
	} // end of deck.numOfCards
};

module.exports = deck;