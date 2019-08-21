const passwords = require('./passwords');
const token = require('./token');

module.exports = {
  ...passwords,
  ...token,
};
