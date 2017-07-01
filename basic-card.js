// inquirer needed for this module
var inquirer = require('inquirer');
var prompt = inquirer.createPromptModule();

// declares BasicCard constructor
var BasicCard = function(front, back) {
	// checks right away to see if it's not already an instance of the constructor
	if (!(this instanceof BasicCard)) {
		return new BasicCard(front, back);
	}

	this.front = front;
	this.back = back;
};

module.exports = BasicCard;