const { matchedData, validationResult } = require("express-validator");
const models = require("../models");

//!Läser alla album som tillhör användaren i databasen photo_app
const readAll = async (req, res) => {
	//"Lazy"-laddar alla album som tillhör den autentiserade användaren
	await req.user.load("Album");

	//Skickar statuskod 200 om det godkänns och skickar med albumet/albumen. Om det inte godkänns är det fel vid autentiseringen och då kommer felkod därifrån.
	res.status(200).send({
		status: "success",
		data: {
			Album: req.user.related("Album"),
		},
	});
};

//!Läser ett specifikt album som tillhör användaren från databasen photo_app
const readSpecific = async (req, res) => {
	//"Lazy"-laddar alla albumn som tillhör den autentiserade användaren
	await req.user.load("Album");

	Album_id = req.params.id;
	User_id = req.user.id;

	//Lägger alla användarens album i en variabel
	const relatedAlbum = req.user.related("Album");

	//Kollar ifall användaren äger albumet som stämmer överens med ID:t i requesten
	usersAlbum = relatedAlbum.find((album) => album.id == req.params.id);

	//Om inte albumet finns eller användaren inte har behörighet till det så skickas denna felkoden
	if (!usersAlbum) {
		return res.status(404).send({
			status: "fail",
			data: "Either the album doesn't exist or the user isn't authorized. 😌",
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
const createAlbum = async (req, res) => {
	//Kollar efter valideringsfel
	const errors = validationResult(req);

	if (!errors.isEmpty()) {
		//Och skickar isåfall med felkod och var det blev fel
		return res.status(422).send({ status: "fail", data: errors.array() });
	}

	//Hämtar ut den validerade datan från express validator:n
	const validData = matchedData(req);
	validData.user_id = req.user.id;

	//Försöker lägga till ett album i databasen
	try {
		const album = await new models.Album(validData).save();
		res.status(200).send({
			status: "success",
			message: "Album created successfully! 🥳",
			data: {
				album,
			},
		});

		//Skickar en felkod om något gick snett från serverns håll
	} catch (error) {
		res.status(500).send({
			status: "error",
			message:
				"Something went wrong when trying to create an album in the database. 😵",
		});
		throw error;
	}
};

//!Lägger till ett foto i ett album via relationstabellen
const postToAlbum = async (req, res) => {
	//Hämtar ut den validerade datan från express validator:n
	const validData = matchedData(req);

	//"Lazy"-laddar ALLA användarens album och albumn, och...
	await req.user.load("Album");
	await req.user.load("Photo");

	//...Lägger de i varsin variabel
	const relatedAlbums = req.user.related("Album");
	const relatedPhotos = req.user.related("Photo");

	//Kollar så det finns ett album med ID som stämmer överens med ID:t ifrån JSON-datan i request body:n och...
	usersPhoto = relatedPhotos.find((photo) => photo.id == validData.photo_id);

	//...Kollar ifall det finns ett album med ID som stämmer överens med Album-ID:t från URL:n och...
	usersAlbum = relatedAlbums.find((album) => album.id == req.params.id);

	//Jämför de båda tillsammans för att skicka ut ett felmeddelande isåfall
	if (!usersAlbum || !usersPhoto) {
		return res.status(404).send({
			status: "fail",
			data: "Either the photo or album doesn't exist, or the user isn't authorized. 😌",
		});
	}

	//Hämtar det valda albumet med redan tillhörande foton, exklusive det som ska läggas till
	const album = await new models.Album({ id: req.params.id }).fetch({
		withRelated: ["Photo"],
	});

	//Skapar en variabel för alla foton i albumet
	const photo = album.related("Photo");

	//Kollar ifall fotot med matchande ID redan finns i albumet och isåfall...
	const existingPhoto = photo.find((photo) => photo.id == validData.photo_id);

	//Skriv att det redan finns, annars...
	if (existingPhoto) {
		return res.status(400).send({
			status: "fail",
			data: "Photo already exists. 🤨",
		});
	}

	//...Försök lägga till fotot till albumet via relationsdatabasen
	try {
		await album.Photo().attach(validData.photo_id);

		res.status(200).send({
			status: "success",
			data: null,
		});

		//Fångar fel och skickar ett felmeddelande
	} catch (error) {
		res.status(500).send({
			status: "error",
			message:
				"Exception thrown in database when adding a photo to a user.",
		});
		throw error;
	}
};

//!Uppdaterar ett album i databasen photo_app
const updateAlbum = async (req, res) => {
	const Album_id = req.params.id;
	const User_id = req.user.id;

	//Kollar så albumet finns och att det tillhör användaren
	const album = await new models.Album({
		id: Album_id,
		User_id: User_id,
	}).fetch({
		require: false,
	});

	//Om inte så skickas denna felkoden
	if (!album) {
		res.status(404).send({
			status: "fail",
			data: "Either the album doesn't exist or the user isn't authorized. 😌",
		});
		return;
	}

	//Kollar efter valideringsfel
	const errors = validationResult(req);

	//Och skickar isåfall med felkod och var det blev fel
	if (!errors.isEmpty()) {
		return res.status(422).send({ status: "fail", data: errors.array() });
	}

	//Hämtar ut den validerade datan från express validator:n
	const validData = matchedData(req);

	//Försöker uppdatera albumet i databasen
	try {
		const updatedAlbum = await album.save(validData);

		res.send({
			status: "success",
			data: {
				updatedAlbum,
			},
		});

		//Skickar en felkod om något gick snett från serverns håll
	} catch (error) {
		res.status(500).send({
			status: "error",
			message:
				"Something went wrong when trying to update an album in the database. 😵",
		});
		throw error;
	}
};

module.exports = {
	readAll,
	readSpecific,
	createAlbum,
	postToAlbum,
	updateAlbum,
};
