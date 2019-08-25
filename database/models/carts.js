module.exports = function getCartModel({ database }) {
  return {
    async getUserCart(userId) {
      const userCart = await database.query(`
        SELECT id, user_id
        FROM carts
        WHERE user_id=$1 AND id NOT IN(SELECT cart_id FROM orders WHERE user_id=$1)`, [userId]);
      return userCart.rows[0];
    },
    async createUserCart(userId) {
      const userCart = await database.query('INSERT INTO carts(user_id) values($1) returning *', [userId]);
      return userCart.rows[0];
    },
    async createCartItem({ cartId, productId }) {
      const cartItem = await database.query(`
        INSERT INTO cart_items(cart_id, product_id, quantity) VALUES($1, $2, 1) returning *`, [cartId, productId]);
      return cartItem.rows[0];
    },
    async updateCartQuantity({ id, quantity }) {
      const cartItem = await database.query(`
        UPDATE cart_items SET quantity=$1 WHERE id=$2 returning *`, [quantity + 1, id]);
      return cartItem.rows[0];
    },
    async getProductFromCart({ productId, cartId }) {
      const product = await database.query(`
      SELECT id, quantity FROM cart_items WHERE product_id=$1 AND cart_id=$2`, [productId, cartId]);
      return product.rows[0];
    },
  };
};
