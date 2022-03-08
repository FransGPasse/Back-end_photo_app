module.exports = (bookshelf) => {
	return bookshelf.model("User", {
		tableName: "User",
		Photo() {
			return this.hasMany("Photo");
		},
	});
};
