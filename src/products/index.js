module.exports = {
  async getAll(_, __, ctx) {
    const products = await ctx.productModel.getAll();
    return products;
  },
  async getProduct(_, { id }, ctx) {
    const product = await ctx.productModel.getSingleProduct(id);
    return product;
  },
};
