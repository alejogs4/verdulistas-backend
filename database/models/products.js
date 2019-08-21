module.exports = function getProductModel({ database }) {
  return {
    async getAllProducts() {
      const products = await database.query('SELECT id, name, code, description, price, image, quantity FROM products');
      return products.rows;
    },
  };
};
