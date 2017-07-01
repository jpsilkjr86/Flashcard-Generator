// inquirer needed for this module
var inquirer = require('inquirer');
var prompt = inquirer.createPromptModule();

// declares BasicCard constructor
var BasicCard = function(str) {
	// checks right away to see if it's not already an instance of the constructor
	if (!(this instanceof BasicCard)) {
		return new BasicCard(str);
	}
	
	this.hi = str;

	this.questions = [{
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
	},{
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
	}];
};

BasicCard.prototype.ask = function() {
	prompt(this.questions).then(function(answers){
		console.log('answers', answers);
	});
};

module.exports = BasicCard;