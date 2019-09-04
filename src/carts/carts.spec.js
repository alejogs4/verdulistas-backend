const user = require('./index');
// id: Int!
//   cart_id: Int!
//   product_id: Int!
//   quantity: Int!
//   product: Product!
describe('Tests for cart resolvers', () => {
  it('Should returns an error is user is not loggued', async () => {
    try {
      await user.addProductToCart({}, {}, {});
    }
    catch (error) {
      expect(error.message).toBe('User should to be loggued to get his cart');
    }
  });
});
