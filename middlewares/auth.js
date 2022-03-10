const bcrypt = require("bcrypt");
const { User } = require("../models");

//Http basic authentication
const basic = async (req, res, next) => {
	//Kolla så att autentisering finns, annars skicka felmeddelande att det krävs
	if (!req.headers.authorization) {
		return res.status(401).send({
			status: "fail",
			data: "Authorization required",
		});
	}

	const [authSchema, base64Payload] = req.headers.authorization.split(" ");

	//Om inte authSchema är av typen basic så skicka felkod för det
	if (authSchema.toLowerCase() !== "basic") {
		return res.status(401).send({
			status: "fail",
			data: "Authorization required",
		});
	}

	//Gör om från base64 till ascii
	const decodedPayload = Buffer.from(base64Payload, "base64").toString(
		"ascii"
	);

	//Dela upp på email och lösenord
	const [email, password] = decodedPayload.split(":");

	//Se ifall det finns en email som stämmer överens med användaren som försöker autentisera sig
	const user = await new User({ email }).fetch({ require: false });
	if (!user) {
		return res.status(401).send({
			status: "fail",
			data: "Authorization failed",
		});
	}

	const hash = user.get("password");


	//Hasha lösenordet och se ifall det överensstämmer med det redan hashade lösenordet från databasen
	const result = await bcrypt.compare(password, hash);
	if (!result) {
		return res.status(401).send({
			status: "fail",
			data: "Authorization failed",
		});
	}

	//Om allt stämmer så godkänn och...
	req.user = user;

	//Skicka sedan vidare
	next();
};

module.exports = {
	basic,
};
