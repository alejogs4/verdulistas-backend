const token = require('../token');

describe('Tests for token functions', () => {
  it('Should returns a token given a payload', async () => {
    const payload = {
      name: 'Alejandro',
      lastname: 'Garcia',
    };

    process.env.TOKEN_PRIVATE_KEY = 'udem2019';
    const stringToken = await token.generateToken(payload);
    expect(typeof stringToken).toBe('string');
  });
});
