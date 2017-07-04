// ****************************** FRONT-END FUNCTIONALITY ******************************
// imports inquirer
var inquirer = require('inquirer');

// initializes inquirer prompt
var prompt = inquirer.createPromptModule();

// imports BasicCard constructor, ClozeCard constructor, and deck object on the back-end
var BasicCard = require('./basic-card.js');
var ClozeCard = require('./cloze-card.js');
var deck = require('./deck.js');

// menu object containing all user prompt information
var menu = {
	// main menu, first question user must answer
	main: function() {
		console.log('\n ========== MAIN MENU ========== \n');
		// inquirer prompt		
		prompt([
		{
			type: 'list',
			message: 'What would you like to do?',
			choices: ['Create a new flashcard.', 'Practice your flashcards.'],
			name: 'choice'
		}
		]).then(function(answers){
			if (answers.choice === 'Create a new flashcard.') {
				return menu.cardType();
			}
			if (answers.choice === 'Practice your flashcards.') {
				// console.log('Practice card feature still in development...');
				return menu.practiceFlashcards.startScreen();
			}
		});
	}, // end of menu.main
	// menu for choosing a card type
	cardType: function() {
		console.log('\n ========== CHOOSE A CARD TYPE ========== \n');
		// inquirer prompt
		prompt([
		{
			type: 'list',
			message: 'What kind of flashcard would you like to create?',
			choices: ['Basic flashcard', 'Cloze flashcard'],
			name: 'choice'
		}
		]).then(function(answers){
			if (answers.choice === 'Basic flashcard') {
				menu.basicCardPrompt();
			}

			if (answers.choice === 'Cloze flashcard') {
				menu.clozeCardPrompt();
			}
		});
	}, // end of menu.cardType
	// basic card prompt content
	basicCardPrompt: function() {
		console.log('\n ========== CREATE A BASIC FLASHCARD ========== \n');
		// inquirer prompt
		prompt([
		// first question
		{
			type: 'input',
			message: 'What text would you like on the front of the card?',
			name: 'front',
			filter: function(str) {
				return str.trim();
			},
			// front-end validation
			validate: function(str) {
				if (str == null || str == '') {
					console.log('\n\nEmpty content is not a valid input value.\n')
					return false;
				}
				return true;
			}
		},{ // second question
			type: 'input',
			message: 'What text would you like on the back of the card?',
			name: 'back',
			filter: function(str) {
				return str.trim();
			},
			// front-end validation
			validate: function(str, hash) {
				if (str == null || str == '') {
					console.log('\n\nEmpty content is not a valid input value.\n')
					return false;
				}
				if (str === hash.front) {
					console.log('\n\nThe front of the card may not be the same as the back of the card.\n');
					return false;
				}
				return true;
			}
		}]).then(function(answers){
			// creates new basic card object (scope safety ensured within constructor itself)
			let newCard = BasicCard(answers.front, answers.back);

			// appends to your-cards.txt
			newCard.addToDeck(function(){
				return menu.main();
			});

			// return menu.main();
		});
	}, // end of menu.basicCardPrompt
	// cloze card prompt content
	clozeCardPrompt: function() {
		console.log('\n ========== CREATE A CLOZE FLASHCARD ========== \n');
		// inquirer prompt
		prompt([
		// first question
		{
			type: 'input',
			message: 'What is the complete sentence answer to this flashcard?',
			name: 'fullAnswer',
			filter: function(str) {
				return str.trim();
			},
			// front-end validation
			validate: function(str) {
				if (str == null || str == '') {
					console.log('\n\nEmpty content is not a valid input value.\n')
					return false;
				}
				return true;
			}
		},{ // second question
			type: 'input',
			message: 'Which part of the full answer would you like to be omitted via ellipsis?',
			name: 'omittedPart',
			filter: function(str) {
				return str.trim();
			},
			// front-end validation
			validate: function(str, hash) {
				if (str == null || str == '') {
					console.log('\n\nEmpty content is not a valid input value.\n')
					return false;
				}
				// makes sure that the omitted part is a subset of the full answer
				if (hash.fullAnswer.search(str) === -1) {
					console.log('\n\n"' + str + '" is not a part of the full answer, "'
						+ hash.fullAnswer + '".\nPlease make sure your input is a subset of the full answer.\n')
					return false;
				}
				// makes sure that the omitted part is not equal to the full string of the full answer
				if (hash.fullAnswer === str) {
					console.log('\n\nThe omitted part may not be equal to the full answer.\n');
					return false;
				}
				return true;
			}
		}]).then(function(answers){
			// creates new cloze-deleted card object (scope safety ensured within constructor itself)
			let newCard = ClozeCard(answers.fullAnswer, answers.omittedPart);

			// appends to your-cards.txt
			newCard.addToDeck(function(){
				return menu.main();
			});

			// return menu.main();
		});
	}, // end of menu.clozeCardPrompt
	// segment of menu front-end that handles flashcard practicing
	practiceFlashcards: {
		startScreen: function() {
			// calls getCards() and saves returned array as allCards array
			const allCards = deck.getCards();
			let cardNumMessage = '';

			console.log('\n ========== PRACTICE FLASHCARDS ========== \n');

			// sets the cardNumMessage portion of the startScreen
			switch (allCards.length) {
				case 0:
					console.log('\nThere are currently no flashcards in this deck.\n'
						+ 'Please create some flashcards first and try again later!\n');
					return menu.main();
					break;
				case 1:
					cardNumMessage = 'You currently have 1 flashcard in your deck.\n';
					break;
				default:
					cardNumMessage = 'You currently have ' 
						+ allCards.length + ' flashcards in your deck.\n';
			}

			// startScreen prompt
			prompt([
			{
				type: 'confirm',
				message: cardNumMessage + 'Continue?',
				name: 'confirm'
			}
			]).then(function(answers){
				if (answers.confirm == false) {
					return menu.main(); 
				}
				// otherwise proceed to "go()", sends starting index [0] and allCards as arguments
				menu.practiceFlashcards.go(0, allCards);
			});
		}, // end of menu.practiceFlashcards.startScreen()
		// .go() handles interface & implementation of flashcard practicing.
		// function handles an index and an array of cards as parameters
		go: function(i, allCards) {
			// exit condition: if i === allCards.length, return menu.main();
			if (i === allCards.length) {
				console.log('You have finished practicing all the flashcards in this deck!\n'
					+ 'Returning to the main menu...\n');
				return menu.main();
			}

			// sets prompt according to values of allCards[i]
			prompt([
			{
				type: 'input',
				message: allCards[i].front,
				name: 'input',
				filter: function(str) {
					return str.trim();
				}
			}]).then(function(answers){
				// in promise, displays result, sets another confirm prompt to continue.
				console.log('Your answer: ' + answers.input
					+ '\nAnswer on back of flashcard: ' + allCards[i].back + '\n');

				// results:
				if (answers.input.toLowerCase() === allCards[i].back.toLowerCase()) {
					console.log('You are correct!\n');
				}
				else {
					console.log('Sorry, you are incorrect.\n');
				}

				// confirm-to-continue prompt:
				prompt([
				{
					type: 'confirm',
					message: 'Continue?',
					name: 'confirm'
				}]).then(function(answers){
					// if yes, increment i++,
					// and call menu.practiceFlashcards.go(i, allCards) recursively
					if (answers.confirm == true) {
						i++;
						menu.practiceFlashcards.go(i, allCards);
					}
					// if no, return menu.main();
					if (answers.confirm == false) {
						console.log('\n\nReturning to the main menu...');
						return menu.main();
					}
				}); // end of confirm prompt promise
			}); // end of input prompt promise			
		} // end of menu.practiceFlashcards.go()
	} // end of menu.practiceFlashcards
}; // end of menu object

module.exports = menu;