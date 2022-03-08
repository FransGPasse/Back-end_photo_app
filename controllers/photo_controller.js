const debug = require("debug")("photo_app:photo_controller");
const { matchedData, validationResult } = require("express-validator");
const models = require("../models");
const bcrypt = require("bcrypt");

/* //!Läser alla "photo" i databasen photo_app
const readAll = async (req, res) => {
	const all_photos = await models.Photo.fetchAll();

	res.send({
		status: "success",
		data: {
			photos: all_photos,
		},
	});
}; */

//!Läser alla "photo" i databasen photo_app
const readAll = async (req, res) => {
	// get user and also eager-load the books-relation
	// const user = await new models.User({ id: req.user.id })
	// 	.fetch({ withRelated: ['books'] });

	// "lazy load" the books-relation
	await req.user.load("Photo");

	res.status(200).send({
		status: "success",
		data: {
			Photo: req.user.related("Photo"),
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

	// get only the validated data from the request
	const validData = matchedData(req);

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

module.exports = { readAll, register };
