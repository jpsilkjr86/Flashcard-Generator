// inquirer needed for this module
var inquirer = require('inquirer');
var prompt = inquirer.createPromptModule();

// declares BasicCard constructor
var BasicCard = function() {
	// checks right away to see if it's not already an instance of the constructor
	if (!(this instanceof BasicCard)) {
		return new BasicCard();
	}

	this.front = '';
	this.back = '';
};

module.exports = BasicCard;