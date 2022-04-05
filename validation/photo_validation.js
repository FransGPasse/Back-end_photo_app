const { body } = require("express-validator");

//!Kollar så fotot har en titel och URL
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
