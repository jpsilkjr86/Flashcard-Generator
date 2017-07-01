// declares ClozeDeletedCard constructor
var ClozeDeletedCard = function(str) {
	// checks right away to see if it's not already an instance of the constructor
	console.log(this instanceof ClozeDeletedCard);
	if (!(this instanceof ClozeDeletedCard)) {
		return new ClozeDeletedCard(str);
	}
	
	this.hi = str;
};

ClozeDeletedCard.prototype.ask = function() {
	return console.log(this.hi);
};

module.exports = ClozeDeletedCard;