const users = require('./users');

module.exports = {
  Query: {
    users: users.getAll,
  },
  Mutation: {
    signUp: users.signUp,
  },
};
