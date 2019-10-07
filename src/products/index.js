module.exports = {
  async getAll(_, __, ctx) {
    const products = await ctx.productModel.getAll();
    return products;
  },
  async getProduct(_, { id }, ctx) {
    const product = await ctx.productModel.getSingleProduct(id);
    return product;
  },
  async createProduct(_, { product }, ctx) {
    if (!ctx.user) {
      throw new Error('User should to be loggued to create a new product');
    }

    if (!ctx.user.admin) {
      throw new Error('User must to be an admin to create a new product');
    }

    const createdProduct = await ctx.productModel.createProduct(product);

    return createdProduct;
  },
  async updateProduct(_, { product, productId }, ctx) {
    if (!ctx.user) {
      throw new Error('User should to be loggued to update a product');
    }

    if (!ctx.user.admin) {
      throw new Error('User must to be an admin to update a product');
    }

    const updatedProduct = await ctx.productModel.updateProduct({ ...product, productId });

    return updatedProduct;
  },
  async deleteProduct(_, { id }, ctx) {
    if (!ctx.user) {
      throw new Error('User should to be loggued to delete a product');
    }

    if (!ctx.user.admin) {
      throw new Error('User must to be an admin to delete a product');
    }

    const deletedProduct = await ctx.productModel.deleteProduct(id);
    return deletedProduct;
  },
};
