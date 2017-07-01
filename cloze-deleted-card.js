// inquirer needed for this module
var inquirer = require('inquirer');
var prompt = inquirer.createPromptModule();

// declares ClozeDeletedCard constructor
var ClozeDeletedCard = function(fullAnswer, omittedPart) {
	// checks right away to see if it's not already an instance of the constructor
	if (!(this instanceof ClozeDeletedCard)) {
		return new ClozeDeletedCard(fullAnswer, omittedPart);
	}

	this.fullAnswer = fullAnswer;
	this.omittedPart = omittedPart;
};

ClozeDeletedCard.prototype.ask = function() {

};

module.exports = ClozeDeletedCard;