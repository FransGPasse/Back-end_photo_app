module.exports = (bookshelf) => {
	return bookshelf.model("Photo", {
		tableName: "Photo",
		User() {
			return this.belongsTo("User");
		},
	});
};
