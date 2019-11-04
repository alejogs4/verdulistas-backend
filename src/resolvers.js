const users = require('./users');
const products = require('./products');
const cart = require('./carts');
const categories = require('./categories');
const orders = require('./orders');

module.exports = {
  Query: {
    users: users.getAll,
    products: products.getAll,
    product: products.getProduct,
    userCart: cart.getUserCart,
    profile: users.getUserProfile,
    categories: categories.getAll,
    orders: orders.getAll,
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
    addCategory: categories.addCategory,
    editCategory: categories.editCategory,
    deleteCategory: categories.deleteCategory,
  },
  Cart: {
    cartItems: cart.getCartItems,
  },
  CartItem: {
    product: cart.getCartItemProduct,
  },
  Product: {
    category: products.getProductCategory,
  },
  Order: {
    user: orders.getOrderUser,
    cart: orders.getOrderCart,
  },
};
