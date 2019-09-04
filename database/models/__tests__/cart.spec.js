const buildCartModel = require('../carts');

describe('Tests for cart model functions', () => {
  it('Should get user cart', async () => {
    const USER_ID = 1

    const database = {
      query: jest.fn(async () => ({
        rows: [
          {
            id: 1,
            user_id: USER_ID,
          },
        ],
      })),
    };

    const cartModel = buildCartModel({ database });
    const userCart = await cartModel.getUserCart(USER_ID);

    expect(typeof userCart).toBe('object');
    expect(userCart.user_id).toBe(USER_ID);
    expect(database.query).toHaveBeenCalled();
    expect(database.query).toHaveBeenCalledTimes(1);
  });

  it('Should create a new user cart', async () => {
    const USER_ID = 1;

    const database = {
      query: jest.fn(async () => ({
        rows: [
          {
            id: 1,
            user_id: USER_ID,
          },
        ],
      })),
    };
    const cartModel = buildCartModel({ database });
    const userCart = await cartModel.createUserCart(USER_ID);

    expect(typeof userCart).toBe('object');
    expect(userCart.user_id).toBe(USER_ID);
    expect(database.query).toHaveBeenCalled();
    expect(database.query).toHaveBeenCalledTimes(1);
    expect(database.query).toHaveBeenCalledWith('INSERT INTO carts(user_id) values($1) returning *', [USER_ID]);
  });
});
