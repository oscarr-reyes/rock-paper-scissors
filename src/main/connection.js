const path     = require("path");
const fs       = require("fs");
const mongoose = require("mongoose");
const env      = process.env.NODE_ENV || "development";
const config   = require("../../config")[env];
const dbConfig = config.database;

const mongoURL   = `mongodb://${dbConfig.host}/${dbConfig.database}`;
const modelsPath = path.join(__dirname, "models");

// Load all files in model directory
fs.readdirSync(modelsPath)
	.filter(file => {
		if (!file.startsWith(".")) {
			return path.extname(file) === ".js";
		}

		else {
			return false;
		}
	})
	.forEach(file => {
		// Load all detected models
		require(path.join(modelsPath, file));
	});

module.exports = mongoose.createConnection(mongoURL);
