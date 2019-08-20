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
});
