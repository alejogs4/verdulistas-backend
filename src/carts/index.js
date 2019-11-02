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
    const possibleCartItem = await ctx.cartModel.getProductFromCart({
      productId,
      cartId: currentCart.id,
    });

    ctx.loaders.getCartItems.clear(currentCart.id);

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
  async generateOrder(_, { order }, ctx) {
    // Verify that user is loggued
    if (!ctx.user) {
      throw new Error('User needs to be loggued to generate the order');
    }
    // Get user cart
    const userCart = await ctx.cartModel.getUserCart(ctx.user.id);
    if (!userCart) {
      throw new Error('User doesn\'t has a current cart');
    }
    // Get user cart items
    const cartItems = await ctx.cartModel.getCartItems(userCart.id);
    if (cartItems.length === 0) {
      throw new Error('User doesn\'t has a products in his cart');
    }
    // Calculate order total
    const orderTotal = cartItems.reduce((total, cartItem) => (
      total + (cartItem.price * cartItem.quantity)
    ), 0);
    // Get user Bond
    const userBond = (await ctx.userModel.getProfile(ctx.user.id)).bond;
    const totalWithBond = orderTotal - userBond;
    // Create order
    const finalOrder = await ctx.cartModel.createOrder({
      cartId: userCart.id,
      userId: ctx.user.id,
      orderTotal: totalWithBond < 0 ? 0 : totalWithBond,
      ...order,
    });

    await ctx.userModel.updateUserBond({
      userId: ctx.user.id,
      bond: totalWithBond < 0 ? Math.abs(totalWithBond) : 0,
    });
    // Update user bond
    await ctx.userModel.updateUserBond({
      userId: ctx.user.id,
      points: orderTotal,
    });
    // Send email to user and admin
    setImmediate(ctx.sendMailForCreatedOrder, {
      user: ctx.user,
      cartItems,
      finalOrder,
      orderTotal,
      userBond,
    });

    setImmediate(ctx.sendMailForCreatedOrder, {
      user: { ...ctx.user, email: 'alejogs4@gmail.com' },
      cartItems,
      finalOrder,
      orderTotal,
      userBond,
      admin: true,
    });

    return {
      message: 'Orden creada',
    };
  },
  async deleteSingleProductFromCart(_, args, ctx) {
    // Verify that user is loggued
    if (!ctx.user) {
      throw new Error('User should to be loggued to delete this product');
    }
    // Delete product to cart, just reduce quantity
    const cartItem = await ctx.cartModel.deleteSingleProductFromCart(args);
    // Clear dataloader cache
    ctx.loaders.getCartItems.clear(cartItem.cart_id);

    return cartItem;
  },
  async deleteProductFromCart(_, args, ctx) {
    // Verify that user is loggued
    if (!ctx.user) {
      throw new Error('User should to be loggued to delete this product');
    }
    // Delete product to cart, just reduce quantity
    const cartItem = await ctx.cartModel.deleteProductFromCart(args);
    // Clear dataloader cache
    ctx.loaders.getCartItems.clear(cartItem.cart_id);

    return cartItem;
  },
  async deleteCart(_, args, ctx) {
    // Verify that user is loggued
    if (!ctx.user) {
      throw new Error('User should to be loggued to delete the cart');
    }
    const cart = await ctx.cartModel.deleteCart(args);
    return cart;
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
