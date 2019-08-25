// Required dependencies
const DataLoader = require('dataloader');
const database = require('../database/connection')();
// Build data loaders
const buildCartDataLoaders = require('./cart');

const cartLoaders = buildCartDataLoaders({ database, DataLoader });

module.exports = {
  ...cartLoaders,
};
