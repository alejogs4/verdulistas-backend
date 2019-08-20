/**
 * Main application setup
 */
require('dotenv').config({ path: './process.env' });
const express = require('express');

const app = express();
// Graphql setup
const setupGraphql = require('./graphql')

setupGraphql(app);

module.exports = app;
