const usersResolvers = require('./index');

describe('Test for user resolvers', () => {
  it('Should gets user array data', async () => {
    const userModel = {
      getAll: jest.fn(async () => []),
    };
    const users = await usersResolvers.getAll({}, {}, { userModel });

    expect(Array.isArray(users)).toBe(true);
    expect(userModel.getAll).toBeCalled();
  });

  it('Should fail if there is not a returned user in login', async () => {
    const userInfo = { email: 'alejogs4@gmail.com', password: '123456' };
    const userModel = {
      signIn: jest.fn().mockResolvedValue(null),
    };

    const auth = {
      encryptPassword: jest.fn().mockImplementation(() => userInfo),
    };

    try {
      await usersResolvers.signIn(null, userInfo, { userModel, auth });
    } catch (error) {
      expect(error.message).toBe('Either email or password are incorrect');
      expect(userModel.signIn).toHaveBeenCalled();
      expect(userModel.signIn).toHaveBeenCalledWith(userInfo.email, userInfo.password);
      expect(auth.encryptPassword).toHaveBeenCalled();
    }
  });

  it('Should return a user with his session token', async () => {
    const userInfo = { email: 'alejogs4@gmail.com', password: '123456' };
    const userModel = {
      signIn: jest.fn().mockResolvedValue(userInfo),
    };

    const auth = {
      encryptPassword: jest.fn().mockImplementation(() => userInfo),
      generateToken: jest.fn().mockImplementation(() => 'tokenvalue'),
    };

    const user = await usersResolvers.signIn(null, userInfo, { userModel, auth });
    expect(user).toEqual({
      user: { ...userInfo },
      token: 'tokenvalue',
    });

    expect(auth.generateToken).toHaveBeenCalled();
    expect(auth.encryptPassword).toHaveBeenCalled();
    expect(userModel.signIn).toHaveBeenCalled();
  });
});
