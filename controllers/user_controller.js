const { matchedData, validationResult } = require("express-validator");
const models = require("../models");
const bcrypt = require("bcrypt");

//!Skapar en använare i databasen photo_app
const register = async (req, res) => {
	//Kollar efter valideringsfel
	const errors = validationResult(req);

	//Och skickar isåfall med felkod och var det blev fel
	if (!errors.isEmpty()) {
		return res.status(422).send({ status: "fail", data: errors.array() });
	}

	//Hämtar ut den validerade datan från express validator:n
	const validData = matchedData(req);

	//Hashar lösenordet 10 gånger
	validData.password = await bcrypt.hash(validData.password, 10);

	//Försöker skapa en använare i databasen
	try {
		const user = await new models.User(validData).save();

		res.status(200).send({
			status: "success",
			message: "User created successfully! 🥳",
			data: {
				email: validData.email,
				first_name: validData.first_name,
				last_name: validData.last_name,
			},
		});
	} catch (error) {
		res.status(500).send({
			status: "error",
			message: "Exception thrown in database when creating a new user.",
		});
		throw error;
	}
};

module.exports = { register };
