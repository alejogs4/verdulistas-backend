const jwt = require('jsonwebtoken');

function generateToken(payload) {
  return new Promise((resolve, reject) => {
    jwt.sign(payload, process.env.TOKEN_PRIVATE_KEY, { expiresIn: '7days' }, (error, token) => {
      if (error) {
        reject(error);
      }
      resolve(token);
    });
  });
}

function getUserByToken(token) {
  const payload = jwt.decode(token)
  return payload;
}

module.exports = {
  generateToken,
  getUserByToken,
};
