const { body } = require("express-validator");
const models = require("../models");

//!Checks if the email inputted is an email address and is maximum 250 characters long
const createRules = [
	body("title").exists().isLength({ max: 250 }),
	body("comment").optional().isLength({ max: 250 }),
	body("url").exists().isURL().isLength({ min: 3 }),
	body("userId").exists(),
];

const updateRules = [
	body("password").optional().isLength({ min: 4 }),
	body("firstName").optional().isLength({ min: 2 }),
	body("lastName").optional().isLength({ min: 2 }),
];

module.exports = {
	createRules,
	updateRules,
};
