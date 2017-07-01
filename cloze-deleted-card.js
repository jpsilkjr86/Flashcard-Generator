var ClozeDeletedCard = function() {
	this.hi = 'hey';
};

ClozeDeletedCard.prototype.ask = function() {
	return console.log(this.hi);
};

module.exports = ClozeDeletedCard;