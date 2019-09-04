/**
 * Main application setup
 */
require('dotenv').config({ path: './process.template.env' });
const express = require('express');

const app = express();
// Graphql setup
const setupGraphql = require('./graphql');
// Express setup
const setupExpress = require('./express');

setupGraphql(app);
setupExpress(app);

module.exports = app;
