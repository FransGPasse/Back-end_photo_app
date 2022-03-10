//Uppkopplingen till databasen sker här
const knex = require("knex")({
	debug: true,
	client: "mysql",
	connection: {
		host: process.env.DB_HOST || "localhost",
		port: process.env.DB_PORT || 3306,
		charset: process.env.DB_CHARSET || "utf8mb4",
		database: process.env.DB_NAME || "photo_app",
		user: process.env.DB_USER || "photo_app",
		password: process.env.DB_PASSWORD || "",
	},
});

const bookshelf = require("bookshelf")(knex);

const models = {};
models.User = require("./User")(bookshelf);
models.Photo = require("./Photo")(bookshelf);
models.Album = require("./Album")(bookshelf);

module.exports = {
	bookshelf,
	...models,
};
