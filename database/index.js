// Database singleton function
const database = require('./connection')();
// Applicaction Models
const makeUserModel = require('./models/users');
const makeProductModel = require('./models/products');
const makeCartModel = require('./models/carts');
const makeCategoriesModel = require('./models/categories');
const makeOrdersModel = require('./models/orders');

const userModel = makeUserModel({ database });
const productModel = makeProductModel({ database });
const cartModel = makeCartModel({ database });
const categoriesModel = makeCategoriesModel({ database });
const ordersModel = makeOrdersModel({ database });

module.exports = {
  userModel,
  productModel,
  cartModel,
  categoriesModel,
  ordersModel,
};
