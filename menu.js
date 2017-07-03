// imports inquirer
var inquirer = require('inquirer');

// initializes inquirer prompt
var prompt = inquirer.createPromptModule();

// imports BasicCard constructor
var BasicCard = require('./basic-card.js');

// imports ClozeCard constructor
var ClozeCard = require('./cloze-card.js');

// menu object containing all user prompt information
var menu = {
	// main menu, first question user must answer
	main: {
		questions: [{
			type: 'list',
			message: 'What would you like to do?',
			choices: ['Create a new flashcard.', 'Practice your flashcards.'],
			name: 'choice'
		}],
		// prompt function for menu.main
		ask: function() {
			prompt(menu.main.questions).then(function(answers){
				if (answers.choice === 'Create a new flashcard.') {
					return menu.cardType.ask();
				}
				if (answers.choice === 'Practice your flashcards.') {
					console.log('Practice card feature still in development...');
					return menu.main.ask();
				}
			});
		}
	}, // end of menu.main
	// menu for choosing a card type
	cardType: {
		questions: [{
			type: 'list',
			message: 'What kind of flashcard would you like to create?',
			choices: ['Basic flashcard', 'Cloze flashcard'],
			name: 'choice'
		}],
		// prompt function for menu.cardType
		ask: function() {
			prompt(menu.cardType.questions).then(function(answers){
				if (answers.choice === 'Basic flashcard') {
					menu.basicCardPrompt.ask();
				}

				if (answers.choice === 'Cloze flashcard') {
					menu.clozeCardPrompt.ask();
				}
			});
		}
	}, // end of menu.cardType
	// basic card prompt content
	basicCardPrompt: {
		questions: [
		// first question
		{
			type: 'input',
			message: 'What text would you like on the front of the card?',
			name: 'front',
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
		}],
		// prompt function for menu.basicCardPrompt
		ask: function() {
			prompt(menu.basicCardPrompt.questions).then(function(answers){
				// creates new basic card object (scope safety ensured within constructor itself)
				let newCard = BasicCard(answers.front, answers.back);

				// appends to your-cards.txt
				newCard.addToDeck();
			});
		}
	}, // end of menu.basicCardPrompt
	// cloze card prompt content
	clozeCardPrompt: {
		questions: [
		// first question
		{
			type: 'input',
			message: 'What is the complete sentence answer to this flashcard?',
			name: 'fullAnswer',
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
		}],
		// prompt function for menu.clozeCardPrompt
		ask: function() {
			prompt(menu.clozeCardPrompt.questions).then(function(answers){
				// creates new cloze-deleted card object (scope safety ensured within constructor itself)
				let newCard = ClozeCard(answers.fullAnswer, answers.omittedPart);

				// appends to your-cards.txt
				newCard.addToDeck();
			});
		}
	}
};

module.exports = menu;