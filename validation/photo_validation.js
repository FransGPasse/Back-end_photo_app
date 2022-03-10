const { body } = require("express-validator");

//!Checks if the email inputted is an email address and is maximum 250 characters long
const createRules = [
	body("title").exists().isLength({ max: 250 }),
	body("comment").optional().isLength({ max: 250 }),
	body("url").exists().isURL().isLength({ min: 3 })
];

const updateRules = [
	body("title").optional().isLength({ min: 4 }),
	body("comment").optional().isLength({ min: 2 }),
	body("url").optional().isLength({ min: 2 }),
];

module.exports = {
	createRules,
	updateRules,
};
