// imports inquirer
var inquirer = require('inquirer');

// initializes prompt
var prompt = inquirer.createPromptModule();		

var menu = {
	// main menu, first question user answers
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
					menu.cardType.ask();
					return;
				}
				if (answers.choice === 'Practice your flashcards.') {
					console.log('Practice card feature still in development...');
					menu.main.ask();
				}
			});
		} // end of menu.main.ask()
	}, // end of menu.main
	// menu for choosing a cart type
	cardType: {
		questions: [{
			type: 'list',
			message: 'What kind of flashcard would you like to create?',
			choices: ['Basic flashcard', 'Clozed flashcard'],
			name: 'choice'
		}],

		ask: function() {
			prompt(menu.cardType.questions).then(function(answers){
				if (answers.choice === 'Basic flashcard') {
					return console.log('Chose to create basic flashcard...');
				}

				if (answers.choice === 'Clozed flashcard') {
					return console.log('Chose to create clozed flashcard...');
				}
			});
		}
	},

};

module.exports = menu;