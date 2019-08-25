/**
 * Main application setup
 */
require('dotenv').config({ path: './process.env' });
const express = require('express');

const app = express();
// Graphql setup
const setupGraphql = require('./graphql')

setupGraphql(app);

// Express
const access = (req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
  res.header('Access-Control-Allow-Headers', 'Content-Type');
  next();
};

app.use(access);

module.exports = app;
