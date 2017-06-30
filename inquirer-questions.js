
var inquirerQuestions = {

	createOrPractice: [{
		type: 'list',
		message: 'What would you like to do?',
		choices: ['Create a new flashcard.', 'Practice your flashcards.'],
		name: 'choice'
	}],

	basicOrClozed: [{
		type: 'list',
		message: 'What kind of flashcard would you like to create?',
		choices: ['Basic flashcard', 'Clozed flashcard'],
		name: 'choice'
	}]
};

module.exports = inquirerQuestions;