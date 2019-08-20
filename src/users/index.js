module.exports = {
  async getAll(_, __, ctx) {
    const users = await ctx.userModel.getAll();
    return users;
  },
  async signUp(_, { user }, ctx) {
    const encryptedUser = ctx.auth.encryptPassword(user);
    const savedUser = await ctx.userModel.signUp(encryptedUser);
    return savedUser;
  },
};
