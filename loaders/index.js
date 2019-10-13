// Required dependencies
const DataLoader = require('dataloader');
const database = require('../database/connection')();
// Build data loaders
const buildCartDataLoaders = require('./cart');
const buildProductDataLoaders = require('./product');
// TODO: Refactor this using currying
const cartLoaders = buildCartDataLoaders({ database, DataLoader });
const productCategoryLoaders = buildProductDataLoaders({ database, DataLoader });

module.exports = {
  ...cartLoaders,
  ...productCategoryLoaders,
};
