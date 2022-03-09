const debug = require("debug")("photo_app:photo_controller");
const { matchedData, validationResult } = require("express-validator");
const models = require("../models");

//!Läser alla "photos" som tillhör den autentiserade användaren i databasen photo_app
const showAll = async (req, res) => {
	await req.user.load("Photo");

	res.status(200).send({
		status: "success",
		data: {
			Photo: req.user.related("Photo"),
		},
	});
};

//!Visar ett specifikt foto från databasen photo_app
const showSpecific = async (req, res) => {
		const photo = await new models.Photo({ id: req.params.id }).fetch({
		withRelated: ["User", "Album"],
	});

	console.log(photo);

	res.send({
		status: "success",
		data: {
			photo,
		},
	});
};

//!Skapar ett "photo" i databasen photo_app
const register = async (req, res) => {
	// check for any validation errors
	const errors = validationResult(req);
	if (!errors.isEmpty()) {
		return res.status(422).send({ status: "fail", data: errors.array() });
	}

	const validData = matchedData(req);
	validData.user_id = req.user.id;

	console.log("The validated data:", validData);

	try {
		const photo = await new models.Photo(validData).save();
		debug("Created new photo successfully: %O", photo);

		res.send({
			status: "success",
			data: {
				photo,
			},
		});
	} catch (error) {
		res.status(500).send({
			status: "error",
			message: "Exception thrown in database when creating a new photo.",
		});
		throw error;
	}
};

//!Uppdaterar ett foto i databasen photo_app
const update = async (req, res) => {
	const photoId = req.params.photoId;

	// make sure photo exists
	const photo = await new models.Photo({ id: photoId }).fetch({
		require: false,
	});
	if (!photo) {
		debug("Photo to update was not found. %o", { id: photoId });
		res.status(404).send({
			status: "fail",
			data: "Photo Not Found",
		});
		return;
	}

	// check for any validation errors
	const errors = validationResult(req);
	if (!errors.isEmpty()) {
		return res.status(422).send({ status: "fail", data: errors.array() });
	}

	// get only the validated data from the request
	const validData = matchedData(req);

	try {
		const updatedPhoto = await photo.save(validData);
		debug("Updated photo successfully: %O", updatedPhoto);

		res.send({
			status: "success",
			data: {
				photo,
			},
		});
	} catch (error) {
		res.status(500).send({
			status: "error",
			message: "Exception thrown in database when updating a new photo.",
		});
		throw error;
	}
};

module.exports = { showAll, showSpecific, register, update };
