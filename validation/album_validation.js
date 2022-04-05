const { body } = require("express-validator");
const models = require("../models");

//!Kollar så det finns ett foto med det ID:t
const addPhotoToAlbumRules = [
	body("photo_id")
		.exists()
		.bail()
		.custom(async (value) => {
			const photo = await new models.Photo({ id: value }).fetch({
				require: false,
			});
			if (!photo) {
				return Promise.reject(`Photo with ID ${value} does not exist.`);
			}

			return Promise.resolve();
		}),
];

const createAlbumRule = [body("title").exists().isLength({ min: 3 })];

const updateRules = [body("title").exists().isLength({ min: 3 })];

module.exports = {
	addPhotoToAlbumRules,
	createAlbumRule,
	updateRules,
};
