// imports inquirer
var inquirer = require('inquirer');

// imports BasicCard constructor
var BasicCard = require('./basic-card.js');

// imports ClozeDeletedCard constructor
var ClozeDeletedCard = require('./cloze-deleted-card.js');

// initializes prompt
var prompt = inquirer.createPromptModule();		

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
	},
	// menu for choosing a card type
	cardType: {
		questions: [{
			type: 'list',
			message: 'What kind of flashcard would you like to create?',
			choices: ['Basic flashcard', 'Cloze deleted flashcard'],
			name: 'choice'
		}],

		ask: function() {
			prompt(menu.cardType.questions).then(function(answers){
				if (answers.choice === 'Basic flashcard') {
					// return console.log('Chose to create basic flashcard...');
					var newCard = new BasicCard;
					newCard.ask();
				}

				if (answers.choice === 'Cloze deleted flashcard') {
					// return console.log('Chose to create loze deleted flashcard...');
					var newCard = new ClozeDeletedCard;
					newCard.ask();
				}
			});
		}
	},
};

module.exports = menu;