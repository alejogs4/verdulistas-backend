module.exports = {
  async getAll(_, __, ctx) {
    const products = await ctx.productModel.getAll();
  },
};
