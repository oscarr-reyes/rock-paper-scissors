const mongoose = require("mongoose");

const RoundSchema = mongoose.Schema({
	winner: {
		type: String,
		required: true,
		validate: [
			arrayValidator(["player1", "player2"]),
			"Winner must be either player1 or player2"
		]
	},
	hand: {
		type: String,
		required: true,
		validate: [
			arrayValidator(["rock", "paper", "scissors"]),
			"Winning round must be either rock, paper or scissors"
		]
	}
});

const MatchSchema = mongoose.Schema({
	player1: {
		type: String,
		required: true
	},
	player2: {
		type: String,
		required: true
	},
	winner: {
		type: String,
		required: true,
		validate: [
			arrayValidator(["player1", "player2"]),
			"Winner must be either player1 or player2"
		]
	},
	rounds: [{
		type: RoundSchema,
		required: true
	}],
	time: {
		type: Date,
		default: Date.now
	}
});

/**
 * Verifies if the closure value is within the array parameters
 *
 * @param  {Array}    array The list of valid values
 * @return {function}       The closure which validates the passed value with the valid list
 */
function arrayValidator(array) {
	return function(value) {
		return array.includes(value);
	};
}

module.exports = mongoose.model("matches", MatchSchema);