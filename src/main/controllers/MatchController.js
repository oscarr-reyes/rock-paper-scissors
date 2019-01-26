const database = require("./../connection");
const Match    = database.model("matches");

const NotFoundResource = require("./../errors/NotFoundResource");
const InvalidBodyError = require("./../errors/InvalidBodyError");

class MatchController {
	/**
	 * Fetch a match record from database with the provided id
	 *
	 * @param  {String}  id The id of the match
	 * @return {Promise}    The result with the match instance
	 */
	static getById(id) {
		return Match.findById(id)
			.then(match => {
				if (!match) {
					throw new NotFoundResource(`Match with id ${id} is not found`);
				}

				else {
					return match;
				}
			});
	}

	/**
	 * Fetches a list of matches from the database
	 *
	 * @return {Promise} The result with a list of match instances
	 */
	static getAll() {
		return Match.find();
	}

	/**
	 * Creates a new match data in the database
	 *
	 * @param  {Object}  data        The body data to insert in the database
	 * @throws {InvalidBodyError} If The provided data is invalid
	 * @return {Promise}             The result with the new match instance
	 */
	static create(data) {
		const match = new Match(data);

		return match.validate()
			.then(() => Match.create(data))
			.catch(error => {
				if (error.name === "ValidationError") {
					throw InvalidBodyError.fromValidationError("Match body is invalid", error);
				}

				else {
					throw error;
				}
			});
	}
}

module.exports = MatchController;