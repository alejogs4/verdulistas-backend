// Database singleton function
const database = require('./connection')();
// Applicaction Models
const makeUserModel = require('./models/users');
const makeProductModel = require('./models/products');
const makeCartModel = require('./models/carts');

const userModel = makeUserModel({ database });
const productModel = makeProductModel({ database });
const cartModel = makeCartModel({ database });

module.exports = {
  userModel,
  productModel,
  cartModel,
};
