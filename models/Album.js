module.exports = (bookshelf) => {
	return bookshelf.model(
		"Album",
		{
			tableName: "Album",
			User() {
				return this.belongsTo("User");
			},
			Photo() {
				return this.belongsToMany("Photo");
			},
		},
		{
			async fetchById(id, fetchOptions = {}) {
				return await new this({ id }).fetch(fetchOptions);
			},
		}
	);
};
