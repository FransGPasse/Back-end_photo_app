const { matchedData, validationResult } = require("express-validator");
const models = require("../models");

//!Visar alla foton som tillhör användaren i databasen photo_app
const showAll = async (req, res) => {
	//"Lazy"-laddar alla albumn som tillhör den autentiserade användare
	await req.user.load("Photo");

	//Skickar statuskod 200 om det godkänns och skickar med fotonen. Om det inte godkänns är det fel vid autentiseringen och då kommer felkod därifrån.
	res.status(200).send({
		status: "success",
		data: {
			Photo: req.user.related("Photo"),
		},
	});
};

//!Visar ett specifikt foto som tillhör användaren från databasen photo_app
const showSpecific = async (req, res) => {
	//"Lazy"-laddar alla foton som tillhör den autentiserade användaren
	await req.user.load("Photo");

	//Lägger alla användarens foton i en variabel
	const relatedPhotos = req.user.related("Photo");

	//Kollar ifall användaren äger fotot som stämmer överens med ID:t i requesten
	usersPhoto = relatedPhotos.find((photo) => photo.id == req.params.id);

	//Om inte fotot finns eller användaren inte har behörighet till det så skickas denna felkoden annars...
	if (!usersPhoto) {
		return res.send({
			status: "fail",
			data: "Photo doesn't belong to user or doesn't exist. 😌",
		});
	}

	//...Skickar vi ut det
	res.send({
		status: "success",
		data: {
			usersPhoto,
		},
	});
};

//!Skapar ett "photo" i databasen photo_app
const register = async (req, res) => {
	//Kollar efter valideringsfel
	const errors = validationResult(req);

	if (!errors.isEmpty()) {
		//Och skickar isåfall med felkod och var det blev fel
		return res.status(422).send({ status: "fail", data: errors.array() });
	}

	const validData = matchedData(req);
	validData.user_id = req.user.id;

	//Försöker lägga til ett foto i databasen
	try {
		const photo = await new models.Photo(validData).save();
		res.send({
			status: "success",
			message: "Photo created successfully 👍🏼",
			data: {
				photo,
			},
		});

		//Skickar en felkod om något gick snett från serverns håll
	} catch (error) {
		res.status(500).send({
			status: "error",
			message:
				"Something went wrong when trying to create a photo in the database. 😵",
		});
		throw error;
	}
};

//!Uppdaterar ett foto i databasen photo_app
const update = async (req, res) => {
	const Photo_id = req.params.id;
	const User_id = req.user.id;

	//Kollar så fotot finns och att det tillhör användaren
	const photo = await new models.Photo({
		id: Photo_id,
		User_id: User_id,
	}).fetch({
		require: false,
	});

	//Om inte så skickas denna felkoden
	if (!photo) {
		res.status(404).send({
			status: "fail",
			data: "Either the photo doesn't exist or the user isn't authorized. 😌",
		});
		return;
	}

	//Kollar efter valideringsfel
	const errors = validationResult(req);

	//Och skickar isåfall med felkod och var det blev fel
	if (!errors.isEmpty()) {
		return res.status(422).send({ status: "fail", data: errors.array() });
	}

	//Försöker uppdatera ett foto i databasen
	const validData = matchedData(req);

	try {
		const updatedPhoto = await photo.save(validData);

		res.send({
			status: "success",
			data: {
				updatedPhoto,
			},
		});

		//Skickar en felkod om något gick snett från serverns håll
	} catch (error) {
		res.status(500).send({
			status: "error",
			message:
				"Something went wrong when trying to create a photo in the database. 😵",
		});
		throw error;
	}
};

module.exports = { showAll, showSpecific, register, update };
