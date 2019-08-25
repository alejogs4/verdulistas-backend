module.exports = {
  async getUserCart(_, __, ctx) {
    // Verify if user is logged
    if (!ctx.user) {
      throw new Error('User should to be loggued to get his cart');
    }
    // get user cart if user has it
    const userCart = await ctx.cartModel.getUserCart(ctx.user.id);
    return userCart;
  },
  async addProductToCart(_, { productId }, ctx) {
    // Verify that user is loggued
    if (!ctx.user) {
      throw new Error('User should to be loggued to get his cart');
    }
    // Get current cart
    const userCart = await ctx.cartModel.getUserCart(ctx.user.id);
    // if user doesn't have cart create it
    const cart = !userCart && (await ctx.cartModel.createUserCart(ctx.user.id));
    const currentCart = userCart || cart;
    // Verify if product already is in the current cart and update quantity
    const possibleCartItem = await ctx.cartModel.getProductFromCart({ productId, cartId: currentCart.id });

    if (possibleCartItem) {
      const cartItem = await ctx.cartModel.updateCartQuantity({
        id: possibleCartItem.id,
        quantity: possibleCartItem.quantity,
      });
      return cartItem;
    }
    // if product doesn't exists create it
    const cartItem = await ctx.cartModel.createCartItem(({ cartId: currentCart.id, productId }));
    return cartItem;
  },
  async getCartItems({ id }, _, ctx) {
    const cartItems = await ctx.loaders.getCartItems.load(id);
    return cartItems.rows;
  },
  // eslint-disable-next-line camelcase
  async getCartItemProduct({ product_id }, _, ctx) {
    const cartItemProduct = await ctx.loaders.getCartItemProduct.load(product_id);
    // console.log({ cartItemProduct: cartItemProduct.rows })
    return cartItemProduct.rows[0];
  },
};
