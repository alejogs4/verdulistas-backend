module.exports = {
  async getAll(_, __, ctx) {
    const categories = await ctx.categoriesModel.getAll();
    return categories;
  },
  async addCategory(_, { name }, ctx) {
    if (!ctx.user) {
      throw new Error('User must to be loggued to add a new category');
    }

    if (!ctx.user.admin) {
      throw new Error('User must to be an admin to add a new category');
    }

    const category = await ctx.categoriesModel.createCategory(name);
    return category;
  },
};
