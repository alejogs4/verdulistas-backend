module.exports = function getOrdersModel({ database }) {
  return {
    async getAll() {
      const orders = await database.query('SELECT id, cart_id, user_id, address, phone, order_date FROM orders');
      return orders.rows;
    },
  };
};
