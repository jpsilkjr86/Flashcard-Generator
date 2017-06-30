
var inquirerQuestions = {

	createOrPractice: [{
		input: 'input',
		message: 'What would you like to do?\n\n'
			+ '1: Create a new flashcard.\n'
			+ '2: Practice your flashcards.\n\n'
			+ 'Select an option by entering the number of your choice:',
		name: 'choice'
	}],

	basicOrClozed: [{
		input: 'input',
		message: '1: Basic flashcard\n'
			+ '1: Clozed flashcard\n\n'
			+ 'What kind of flashcard would you like to create?',
		name: 'choice'
	}]
};

module.exports = inquirerQuestions;