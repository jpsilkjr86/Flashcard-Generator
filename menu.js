// imports inquirer
var inquirer = require('inquirer');

// initializes inquirer prompt
var prompt = inquirer.createPromptModule();		

// imports BasicCard constructor
var BasicCard = require('./basic-card.js');

// imports ClozeDeletedCard constructor
var ClozeDeletedCard = require('./cloze-deleted-card.js');

var menu = {
	// main menu, first question user must answer
	main: {
		questions: [{
			type: 'list',
			message: 'What would you like to do?',
			choices: ['Create a new flashcard.', 'Practice your flashcards.'],
			name: 'choice'
		}],

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
			choices: ['Basic flashcard', 'Cloze deleted flashcard'],
			name: 'choice'
		}],
		// prompt function
		ask: function() {
			prompt(menu.cardType.questions).then(function(answers){
				if (answers.choice === 'Basic flashcard') {
					var newBasicCard = BasicCard();
					menu.basicCardPrompt.ask();
				}

				if (answers.choice === 'Cloze deleted flashcard') {
					var newClozeDeletedCard = ClozeDeletedCard();
					menu.clozeDeletedCardPrompt.ask();
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
		// prompt function
		ask: function() {
			prompt(menu.basicCardPrompt.questions).then(function(answers){
				console.log('\nBasic flashcard successfully created!'
					+ '\nFront side: ' + answers.front
					+ '\nBack side: ' + answers.back + '\n');
			});
		}
	}, // end of menu.basicCardPrompt
	// cloze deleted card prompt content
	clozeDeletedCardPrompt: {

	}
};

module.exports = menu;