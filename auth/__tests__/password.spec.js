const passwords = require('../passwords');

describe('Tests for auth password helpers', () => {
  it('Should returns user information with encrypted password without modify the current user', () => {
    const user = {
      name: 'Miguel',
      lastname: 'Velez',
      password: '1234',
    };

    const userCopied = {
      name: 'Miguel',
      lastname: 'Velez',
      password: '1234',
    };

    const expectedUser = {
      name: 'Miguel',
      lastname: 'Velez',
      password: '36acf017ea0974457577506ef75268ac93ed6d61864ee994f438b63916ed1736',
    };

    expect(passwords.encryptPassword(user)).toEqual(expectedUser);
    expect(user).toEqual(userCopied);
  });
});
