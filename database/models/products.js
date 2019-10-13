module.exports = function getProductModel({ database }) {
  return {
    async getAll() {
      const products = await database.query('SELECT id, name, code, description, price, image, quantity, category_id FROM products');
      return products.rows;
    },
    async getSingleProduct(id) {
      const product = await database.query(`
        SELECT id, name, code, description, price, image, quantity, category_id FROM products WHERE id=$1
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
      categoryId,
    }) {
      const product = await database.query(`
        INSERT INTO products(code, name, description, quantity, image, price, category_id)
        values($1, $2, $3, $4, $5, $6, $7) returning *
        `, [code, name, description, quantity, image, price, categoryId]);

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
      categoryId,
    }) {
      const product = await database.query(`
        UPDATE products SET code=$1, name=$2, description=$3, quantity=$4, image=$5, price=$6, category_id=$8 
        WHERE id=$7 returning *
        `, [code, name, description, quantity, image, price, productId, categoryId]);

      return product.rows[0];
    },
    async deleteProduct(id) {
      const product = await database.query('DELETE FROM products WHERE id=$1 returning *', [id]);

      return product.rows[0];
    },
  };
};
