module.exports = {
  async getAll(_, __, ctx) {
    if (!ctx.user) {
      throw new Error('User must to be loggued to get orders');
    }

    if (!ctx.user.admin) {
      throw new Error('User must to be an admin to get orders');
    }
    const orders = await ctx.ordersModel.getAll()
    return orders;
  },
  async getOrderUser({ user_id }, _, ctx) {
    const user = await ctx.userModel.getProfile(user_id);
    return user;
  },
  async getOrderCart({ cart_id }, _, ctx) {
    const cart = await ctx.cartModel.getCartById(cart_id);
    return cart;
  },
};
