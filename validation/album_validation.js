const { body } = require("express-validator");
const models = require("../models");

//!Checks if the email inputted is an email address and is maximum 250 characters long
const addPhotoToAlbumRules = [
	body("Photo_id")
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

module.exports = {
	addPhotoToAlbumRules,
	createAlbumRule,
};
