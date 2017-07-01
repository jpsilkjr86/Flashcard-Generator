// BIG PICTURE PLAN

/*
	.gitignore: your-cards.txt
	1) User runs program on node (node flashcard.js, no arguments)
	2) Inquirer prompt asking user if they woud like to:
		a) make a new flashcard
			i) BasicCard
				-What would you like on the front of the card?
				-What would you like on the back of the card?
				-Saves info as new instance of BasicCard
					--stringify and append to file called your-cards.txt (&& in front)
					--if no file exists, create new one without &&
			ii) ClozeCard
				-Please write the full sentence as it would appear on the answer side.
				-Which word or words would you like to omit from the sentence
					*if input is invalid, return and try again.
				-Saves info as new instance of BasicCard
					--stringify and append to file called your-cards.txt (separate objects with &&)
					--if no file exists, create new one without &&
		EXTRA:
		b) practice flashcards
			i) if no cards in array, return message 'Sorry, you have not created any cards yet.'
			ii) reads your-cards.txt
				-Algorithm for reading title of card set
				-split rest of data by &&, save as array variable
				-JSON.parse each element of array
				-display contents in random order
					--check if answer is right or wrong
					--display results		

*/

// imports mainMenu object
var menu = require('./menu.js');

// start by displaying the main menu question
menu.main.ask();
