const debug = require("debug")("photo_app:user_controller");
const { matchedData, validationResult } = require("express-validator");
const models = require("../models");
const bcrypt = require("bcrypt");

//!Läser alla "User" i databasen photo_app
const readAll = async (req, res) => {
	const all_users = await models.User.fetchAll();

	res.send({
		status: "success",
		data: {
			users: all_users,
		},
	});
};

//!Skapar en "User" i databasen photo_app
const register = async (req, res) => {
	// check for any validation errors
	const errors = validationResult(req);
	if (!errors.isEmpty()) {
		return res.status(422).send({ status: "fail", data: errors.array() });
	}

	// get only the validated data from the request
	const validData = matchedData(req);

	//Hashes the password 10 times
	validData.password = await bcrypt.hash(validData.password, 10);

	console.log("The validated data:", validData);

	try {
		const user = await new models.User(validData).save();
		debug("Created new user successfully: %O", user);

		res.send({
			status: "success",
			data: {
				user,
			},
		});
	} catch (error) {
		res.status(500).send({
			status: "error",
			message: "Exception thrown in database when creating a new user.",
		});
		throw error;
	}
};

module.exports = { readAll, register };
