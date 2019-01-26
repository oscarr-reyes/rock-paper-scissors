const express     = require("express");
const cors        = require("cors");
const debug       = require("debug")("app:main");
const matchRouter = require("./src/main/routers/match");

const app = express();

app.use(express.static("dist"));
app.use(cors());
app.use(express.json());
app.use("/api/matches", matchRouter);

app.use(errorHandler);

/**
 * Handles the error thrown in the app
 *
 * @param {Error}    error    The error triggered in the app
 * @param {Request}  request  The request received in the route
 * @param {Response} response The response of the route
 * @param {Function} next     The callback to trigger next middleware
 */
function errorHandler(error, request, response, next) {
	debug(error);

	switch(error.name) {
		case "InvalidBodyError":
			response.status(409);
			response.json(error.toJSON());
			break;

		case "NotFoundResource":
			response.status(404);
			response.json(error.toJSON());
			break;

		default:
			response.status(500);
			response.end();
	}

	next();
}

module.exports = app;
