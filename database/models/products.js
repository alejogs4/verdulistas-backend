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
    async createProduct({
      code,
      name,
      description,
      quantity,
      image,
      price,
    }) {
      const product = await database.query(`
        INSERT INTO products(code, name, description, quantity, image, price) values($1, $2, $3, $4, $5, $6) returning *
        `, [code, name, description, quantity, image, price]);

      return product.rows[0];
    },
    async updateProduct({
      productId,
      code,
      name,
      description,
      quantity,
      image,
      price,
    }) {
      const product = await database.query(`
        UPDATE products SET code=$1, name=$2, description=$3, quantity=$4, image=$5, price=$6 WHERE id=$7 returning *
        `, [code, name, description, quantity, image, price, productId]);

      return product.rows[0];
    },
    async deleteProduct(id) {
      const product = await database.query('DELETE FROM products WHERE id=$1 returning *', [id]);

      return product.rows[0];
    },
  };
};
