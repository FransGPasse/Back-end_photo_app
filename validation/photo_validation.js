const { body } = require("express-validator");

//!Checks if the photo has a title and URL
const createRules = [
	body("title").exists().isLength({ min: 3 }),
	body("url").exists().isURL(),
	body("comment").optional().isLength({ min: 3 }),
];

const updateRules = [
	body("title").optional().isLength({ min: 3 }),
	body("url").optional().isURL(),
	body("comment").optional().isLength({ min: 3 }),
];

module.exports = {
	createRules,
	updateRules,
};
