// Database singleton function
const database = require('./connection')();
// Applicaction Models
const makeUserModel = require('./models/users');
const makeProductModel = require('./models/products');

const userModel = makeUserModel({ database });
const productModel = makeProductModel({ database });

module.exports = {
  userModel,
  productModel,
};
