const users = require('./users');
const products = require('./products');
const cart = require('./carts');

module.exports = {
  Query: {
    users: users.getAll,
    products: products.getAll,
    product: products.getProduct,
    userCart: cart.getUserCart,
  },
  Mutation: {
    signUp: users.signUp,
    signIn: users.signIn,
    addProductToCart: cart.addProductToCart,
    deleteOneProductFromCart: cart.deleteSingleProductFromCart,
    deleteProductFromCart: cart.deleteProductFromCart,
    deleteCart: cart.deleteCart,
    createOrder: cart.generateOrder,
    createProduct: products.createProduct,
    updateProduct: products.updateProduct,
    deleteProduct: products.deleteProduct,
  },
  Cart: {
    cartItems: cart.getCartItems,
  },
  CartItem: {
    product: cart.getCartItemProduct,
  },
};
