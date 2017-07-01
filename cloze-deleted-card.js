// inquirer needed for this module
var inquirer = require('inquirer');
var prompt = inquirer.createPromptModule();

// declares ClozeDeletedCard constructor
var ClozeDeletedCard = function() {
	// checks right away to see if it's not already an instance of the constructor
	if (!(this instanceof ClozeDeletedCard)) {
		return new ClozeDeletedCard;
	}

	this.front = '';
	this.back = '';
};

ClozeDeletedCard.prototype.ask = function() {

};

module.exports = ClozeDeletedCard;