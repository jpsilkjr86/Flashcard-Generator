// inquirer needed for this module
var inquirer = require('inquirer');
var prompt = inquirer.createPromptModule();

// declares ClozeDeletedCard constructor
var ClozeDeletedCard = function(str) {
	// checks right away to see if it's not already an instance of the constructor
	if (!(this instanceof ClozeDeletedCard)) {
		return new ClozeDeletedCard(str);
	}
	
	this.hi = str;
};

ClozeDeletedCard.prototype.ask = function() {
	return console.log(this.hi);
};

module.exports = ClozeDeletedCard;