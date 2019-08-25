module.exports = function getProductModel({ database }) {
  return {
    async getAll() {
      const products = await database.query('SELECT id, name, code, description, price, image, quantity FROM products');
      return products.rows;
    },
    async getSingleProduct(id) {
      const product = await database.query(`
        SELECT id, name, code, description, price, image, quantity FROM products WHERE id=$1
        `, [id]);

      return product.rows[0];
    },
  };
};
