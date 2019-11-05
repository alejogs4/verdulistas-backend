module.exports = {
  async getAll(_, __, ctx) {
    const categories = await ctx.categoriesModel.getAll();
    return categories;
  },
  async addCategory(_, { name, icon }, ctx) {
    if (!ctx.user) {
      throw new Error('User must to be loggued to add a new category');
    }

    if (!ctx.user.admin) {
      throw new Error('User must to be an admin to add a new category');
    }

    const category = await ctx.categoriesModel.createCategory(name, icon);
    return category;
  },
  async editCategory(_, { name, icon, id }, ctx) {
    if (!ctx.user) {
      throw new Error('User must to be loggued to edit a category');
    }

    if (!ctx.user.admin) {
      throw new Error('User must to be an admin to edit a category');
    }
    const category = await ctx.categoriesModel.editCategory({ name, icon, id });
    return category;
  },
  async deleteCategory(_, { id }, ctx) {
    if (!ctx.user) {
      throw new Error('User must to be loggued to delete a category');
    }

    if (!ctx.user.admin) {
      throw new Error('User must to be an admin to delete a category');
    }
    const category = await ctx.categoriesModel.deleteCategory(id);
    return category;
  },
};
