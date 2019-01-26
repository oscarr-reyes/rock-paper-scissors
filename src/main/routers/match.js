const express = require("express");
const MatchController = require("./../controllers/MatchController");
const Router = express.Router();

Router.route("/")
	.get((request, response, next) => {
		MatchController.getAll()
			.then(matches => response.json(matches))
			.catch(error => next(error));
	})
	.post((request, response, next) => {
		MatchController.create(request.body)
			.then(match => response.json(match))
			.catch(error => next(error));
	});

module.exports = Router;