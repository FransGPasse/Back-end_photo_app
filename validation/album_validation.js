const { body } = require("express-validator");
const models = require("../models");

//!Checks if the email inputted is an email address and is maximum 250 characters long
const createRules = [body("title").exists().isLength({ min: 1 })];

const updateRules = [
	body("password").optional().isLength({ min: 4 }),
	body("firstName").optional().isLength({ min: 2 }),
	body("lastName").optional().isLength({ min: 2 }),
];

module.exports = {
	createRules,
	updateRules,
};
