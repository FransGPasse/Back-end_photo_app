const debug = require("debug")("photo_app:album_controller");
const { matchedData, validationResult } = require("express-validator");
const models = require("../models");

//!Läser alla "Album" som tillhör den autentiserade användaren i databasen photo_app
const readAll = async (req, res) => {
	await req.user.load("Album");

	res.status(200).send({
		status: "success",
		data: {
			Album: req.user.related("Album"),
		},
	});
};

//!Skapar ett "album" i databasen photo_app
const register = async (req, res) => {
	const errors = validationResult(req);
	if (!errors.isEmpty()) {
		return res.status(422).send({ status: "fail", data: errors.array() });
	}

	const validData = matchedData(req);
	validData.user_id = req.user.id;

	console.log("The validated data:", validData);

	try {
		const album = await new models.Album(validData).save();
		debug("Created new album successfully: %O", album);

		res.send({
			status: "success",
			
			data: {
				album,
			},
		});
	} catch (error) {
		res.status(500).send({
			status: "error",
			message: "Exception thrown in database when creating a new album.",
		});
		throw error;
	}
};

module.exports = { readAll, register };
