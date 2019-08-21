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
  async signIn(_, { email, password }, ctx) {
    // Encrypt password
    const encryptedInformation = ctx.auth.encryptPassword({ password });
    // Get user by email and password
    const user = await ctx.userModel.signIn(email, encryptedInformation.password);
    // Verify that user exists
    if (!user) {
      throw new Error('Either email or password are incorrect');
    }
    // Generate user token
    const token = await ctx.auth.generateToken(user);
    return {
      user,
      token,
    };
  },
};
