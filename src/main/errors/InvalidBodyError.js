const _ = require("underscore");
const BaseError = require("./BaseError");

class InvalidBodyError extends BaseError{
	constructor(message, fields){
		super(message);

		this.message = message;
		this.name = "InvalidBodyError";

		if(!_.isUndefined(fields)){
			this.errors = fields;
		}
	}

	static fromValidationError(message, ValidationError) {
		const errorPaths = Object.keys(ValidationError.errors);

		const errors = errorPaths.map(path => {
			const error = ValidationError.errors[path];

			return {
				path: error.path,
				message: error.message
			};
		});

		return new this(message, errors);
	}
}

module.exports = InvalidBodyError;