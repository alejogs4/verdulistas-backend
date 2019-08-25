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

  it('Should returns an object', () => {
    const userToken = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c';
    const payload = token.getUserByToken(userToken);
    expect(typeof payload).toBe('object');
  });

  it('Should returns an object with some properties', () => {
    const userToken = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c';
    const payload = token.getUserByToken(userToken);
    expect(payload.sub).toBeDefined();
    expect(payload.name).toBeDefined();
    expect(payload.iat).toBeDefined();
  });
});
