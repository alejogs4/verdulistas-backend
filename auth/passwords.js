const crypto = require('crypto');
/**
 * Encrypt user password with an user as parameter
 * @param {User} user
 */
function encryptPassword(user) {
  const newUserWithEncryptedPassword = { ...user };
  newUserWithEncryptedPassword.password = crypto.createHmac('sha256', newUserWithEncryptedPassword.password).digest('hex');
  return newUserWithEncryptedPassword;
}

module.exports = {
  encryptPassword,
};
