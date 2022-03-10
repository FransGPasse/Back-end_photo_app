const { body } = require("express-validator");
const models = require("../models");

//!Definierar kraven för användaren som registrerar sig
const createUserRules = [
	body("email").exists().isEmail(),
	body("password").exists().isLength({ min: 6 }),

	//Såg för sent här att det var denna stavningen i databasen så får tyvärr låta stå
	body("firstName").exists().isLength({ min: 3 }),
	body("lastName").exists().isLength({ min: 3 }),
];

module.exports = {
	createUserRules,
};
