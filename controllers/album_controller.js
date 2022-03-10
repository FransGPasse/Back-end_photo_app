const { matchedData, validationResult } = require("express-validator");
const models = require("../models");

//!Läser alla album som tillhör den autentiserade användaren i databasen photo_app
const readAll = async (req, res) => {
	//"Lazy"-laddar alla albumn som tillhör den autentiserade användaren
	await req.user.load("Album");

	//Skickar statuskod 200 om det godkänns och skickar med albumet/albumen. Om det inte godkänns är det fel vid autentiseringen och då kommer felkod därifrån.
	res.status(200).send({
		status: "success",
		data: {
			Album: req.user.related("Album"),
		},
	});
};

//!Visar ett specifikt album från databasen photo_app
const readSpecific = async (req, res) => {
	//"Lazy"-laddar alla albumn som tillhör den autentiserade användaren
	await req.user.load("Album");

	Album_id = req.params.id;
	User_id = req.user.id;

	//Lägger alla album i en variabel
	const relatedAlbum = req.user.related("Album");

	//Kollar ifall användaren äger albumet som stämmer överens med ID:t i requesten
	usersAlbum = relatedAlbum.find((album) => album.id == req.params.id);

	//
	if (!usersAlbum) {
		return res.send({
			status: "fail",
			data: "Album doesn't belong to user or doesn't exist. 😌",
		});
	}

	//Hämtar albumet med det inskickade ID:t och skickar med det relaterade fotonen
	const selectedAlbum = await models.Album.fetchById(Album_id, {
		withRelated: ["Photo"],
	});

	res.send({
		status: "success",
		data: {
			selectedAlbum,
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

		res.status(200).send({
			status: "success",
			message: "Album created successfully 🥳",
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

const postToAlbum = async (req, res) => {
	//Hämtar ut den validerade datan från express validator:n
	const validData = matchedData(req);

	//"Lazy"-laddar ALLA användarens album och albumn, och...
	await req.user.load("Album");
	await req.user.load("Photo");

	//... Lägger de i varsin variabel
	const relatedAlbums = req.user.related("Album");
	const relatedPhotos = req.user.related("Photo");

	//Kollar så det finns ett album med ID som stämmer överens med ID:t ifrån JSON-datan i request body:n
	usersPhoto = relatedPhotos.find((photo) => photo.id == validData.Photo_id);

	//Och kollar ifall det finns ett album med ID som stämmer överens med Album-ID:t från URL:n
	usersAlbum = relatedAlbums.find((album) => album.id == req.params.id);


	//Hämtar det valda albumet med redan tillhörande album, exklusive det som ska läggas till
	const album = await new models.Album({ id: req.params.id }).fetch({
		withRelated: ["Photo"],
	});

	//Getting the photos inside the album
	const photo = album.related("Photo");

	//Check if the photo I want to add exists in the album
	const existing_photo = photo.find(
		(photo) => photo.id == validData.Photo_id
	);

	//If it does, fail
	if (existing_photo) {
		return res.status(400).send({
			status: "fail",
			data: "Photo already exists.",
		});
	}

	//If it does, fail
	if (!usersAlbum) {
		return res.status(401).send({
			status: "fail",
			data: "Album doesn't belong to user or doesn't exist. 😌",
		});
	}

	//If it does, fail
	if (!usersPhoto) {
		return res.status(401).send({
			status: "fail",
			data: "Photo doesn't belong to user or doesn't exist. 😌",
		});
	}

	//Försöker lägga till albumt till albumet
	try {
		await album.Photo().attach(validData.Photo_id);

		res.status(200).send({
			status: "success",
			data: null,
		});
	} catch (error) {
		//Fångar fel och skickar ett felmeddelande
		res.status(500).send({
			status: "error",
			message:
				"Exception thrown in database when adding a photo to a user.",
		});
		throw error;
	}
};

module.exports = { readAll, readSpecific, register, postToAlbum };
