module.exports = function buildCartDataLoaders({ database, DataLoader }) {
  async function getCartItems(cartIds) {
    const cartItemsPetition = cartIds.map((cartId) => (
      database.query('SELECT id, cart_id, product_id, quantity FROM cart_items WHERE cart_id=ANY($1)', [[cartId]])
    ));

    const cartItems = await Promise.all(cartItemsPetition);
    return cartItems;
  }

  async function getCartItemProduct(productIds) {
    const cartItemsProductsPetition = productIds.map((productId) => (
      database.query(`
        SELECT id, code, name, description, price, image, quantity FROM products WHERE id=ANY($1)`, [[productId]])
    ));

    const cartItemsProducts = await Promise.all(cartItemsProductsPetition);
    return cartItemsProducts;
  }

  return {
    getCartItems: new DataLoader(getCartItems),
    getCartItemProduct: new DataLoader(getCartItemProduct),
  };
};
