module.exports = {
  async getAll(_, __, ctx) {
    const users = await ctx.userModel.getAll();
    return users;
  },
  async signUp(_, { user }, ctx) {
    const encryptedUser = ctx.auth.encryptPassword(user);
    const savedUser = await ctx.userModel.signUp(encryptedUser);
    const referrer = await ctx.userModel.getUserByReferralCode(user.referral_code);

    if (referrer) {
      ctx.userModel.updateUserBond({ points: 50000, userId: referrer.id });
    }

    return savedUser;
  },
  async signIn(_, { email, password }, ctx) {
    // Encrypt password
    const encryptedInformation = ctx.auth.encryptPassword({ password });
    // Get user by email and password
    const user = await ctx.userModel.signIn(email, encryptedInformation.password);
    // Verify that user exists
    if (!user) throw new Error('Either email or password are incorrect');
    // Generate user token
    const token = await ctx.auth.generateToken(user);
    return {
      user,
      token,
    };
  },
  async getUserProfile(_, { id }, ctx) {
    // Get user profile
    const user = await ctx.userModel.getProfile(id);
    // Verify that user really exists
    if (!user) {
      throw new Error(`User with id: ${id} doesn't exists in database`);
    }
    // Returns user profile
    return user;
  },
};
