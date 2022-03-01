const models = require("../models");

const read = async (req, res) => {
	const all_users = await models.User.fetchAll();

	res.send({
		status: "success",
		data: {
			users: all_users,
		},
	});
};

module.exports = { read };
