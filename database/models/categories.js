module.exports = function getCategoriesModel({ database }) {
  return {
    async getAll() {
      const categories = await database.query('SELECT id, name, icon FROM categories');
      return categories.rows;
    },
    async createCategory(name) {
      const category = await database.query('INSERT INTO categories(name) VALUES($1) returning *', [name]);
      return category.rows[0];
    },
    async editCategory({ name, icon, id } = {}) {
      const category = await database.query(`
        UPDATE categories SET name=$1, icon=$2 WHERE id=$3 returning *`, [name, icon, id]);
      return category.rows[0];
    },
    async deleteCategory(id) {
      const category = await database.query('DELETE FROM categories WHERE id=$1 returning *', [id]);
      return category.rows[0];
    },
  };
};
