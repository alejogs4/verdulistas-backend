const { ApolloServer } = require('apollo-server-express');
const { resolvers, typeDefs } = require('./src');
// Applications models
const models = require('./database');
// Auth service
const auth = require('./auth');

module.exports = function setupApolloServer(app) {
  const server = new ApolloServer({
    typeDefs,
    resolvers,
    playground: true,
    context: () => ({
      ...models,
      auth,
    }),
  });

  server.applyMiddleware({ app, path: '/graphql' });
};
