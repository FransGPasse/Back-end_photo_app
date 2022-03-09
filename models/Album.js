module.exports = (bookshelf) => {
	return bookshelf.model("Album", {
		tableName: "Album",
		belongsToThisUser() {
			return this.belongsTo("User");
		},
		photos() {
			return this.belongsToMany("Photos");
		},
/* 		async fetchById(id, fetchOptions = {}) {
			return await new this({ id }).fetch(fetchOptions);
		}, */
	});
};
