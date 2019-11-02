const getUserModel = require('../users');

describe('Tests for user model', () => {
  it('Should return a single user from database given an id', async () => {
    const storedUser = {
      id: 1,
      name: 'Alejandro',
      lastname: 'Garcia Serna',
      email: 'alejogs4@gmail.com',
      admin: true,
    };

    const database = {
      query: jest.fn().mockResolvedValue({
        rows: [storedUser],
      }),
    };

    const userModel = getUserModel({ database });
    const user = await userModel.getProfile(1);

    expect(user).toEqual(storedUser);
    expect(database.query).toHaveBeenCalledTimes(1);
    expect(database.query).toHaveBeenCalledWith('SELECT id, name, lastname, email, admin, bond, referral_code FROM users WHERE id=$1', [1]);
  });
});
