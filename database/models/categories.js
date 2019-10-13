module.exports = function getCategoriesModel({ database }) {
  return {
    async getAll() {
      const categories = await database.query('SELECT id, name FROM categories');
      return categories.rows;
    },
    async createCategory(name) {
      const category = await database.query('INSERT INTO categories(name) VALUES($1) returning *', [name]);
      return category.rows[0];
    },
  };
};
