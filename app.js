/**
 * Main application setup
 */
const express = require('express')
const app = express()
// Graphql setup
const setupGraphql = require('./graphql')
setupGraphql(app)

module.exports = app
