module.exports = (bookshelf) => {
	return bookshelf.model(
		"Photo",
		{
			tableName: "Photo",
			User() {
				return this.belongsTo("User");
			},
			Album() {
				return this.belongsToMany("Album");
			},
		},
		{
			async fetchById(id, fetchOptions = {}) {
				return await new this({ id }).fetch(fetchOptions);
			},
		}
	);
};
