const path = require('path');
const fs = require('fs');

const query = fs.readFileSync(path.join(__dirname, 'query.gql'), { encoding: 'utf8' });
const mutation = fs.readFileSync(path.join(__dirname, 'mutation.gql'), { encoding: 'utf8' });
const users = fs.readFileSync(path.join(__dirname, 'users', 'user.gql'), { encoding: 'utf8' });
const products = fs.readFileSync(path.join(__dirname, 'products', 'product.gql'), { encoding: 'utf8' });
const carts = fs.readFileSync(path.join(__dirname, 'carts', 'cart.gql'), { encoding: 'utf8' });
const categories = fs.readFileSync(path.join(__dirname, 'categories', 'categories.gql'), { encoding: 'utf8' });

module.exports = `
  ${users}
  ${query}
  ${mutation}
  ${products}
  ${carts}
  ${categories}
`;
