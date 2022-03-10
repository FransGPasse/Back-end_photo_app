const debug = require("debug")("photo_app:photo_controller");
const { matchedData, validationResult } = require("express-validator");
const models = require("../models");

//!Läser alla foton som tillhör den autentiserade användaren i databasen photo_app
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

	//"Lazy"-laddar alla foton som tillhör den autentiserade användaren
	await req.user.load("Photo");

	//Lägger alla fotona i en variabel
	const relatedPhotos = req.user.related("Photo");

	//
	usersPhoto = relatedPhotos.find((photo) => photo.id == req.params.id);

	//If it does, fail
	if (!usersPhoto) {
		return res.send({
			status: "fail",
			data: "Photo doesn't belong to user. 😡",
		});
	}

	res.send({
		status: "success",
		data: {
			usersPhoto,
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
	const photoId = req.params.id;

	//Kollar så fotot finns
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
