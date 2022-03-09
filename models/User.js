module.exports = (bookshelf) => {
	return bookshelf.model("User", {
		tableName: "User",
		Photo() {
			return this.hasMany("Photo");
		},
		Album() {
			return this.hasMany("Album");
		},
/* 		async fetchById(id, fetchOptions = {}) {
			return await new this({ id }).fetch(fetchOptions);
		}, */
	});
};
