// Database singleton function
const database = require('./connection')();
// Applicactions Model
const makeUserModel = require('./models/users');

const userModel = makeUserModel({ database });

module.exports = {
  userModel,
};
