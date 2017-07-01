var BasicCard = function() {
	this.hi = 'ho';
};

BasicCard.prototype.ask = function() {
	return console.log(this.hi);
};

module.exports = BasicCard;