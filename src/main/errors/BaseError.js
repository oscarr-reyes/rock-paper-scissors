const _ = require("underscore");

class BaseError extends Error{
	constructor(message){
		super(message);

		this.name = "BaseError";

		Error.captureStackTrace(this, this.constructor);
	}

	toJSON(){
		let properties = ["name", "message", "errors"];
		let errorObject = {};

		properties.forEach(property => {
			if(!_.isUndefined(this[property])){
				errorObject[property] = this[property];
			}
		});

		return errorObject;
	}
}

module.exports = BaseError;