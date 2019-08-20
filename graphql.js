const { ApolloServer } = require('apollo-server-express');
const { resolvers, typeDefs } = require('./src');

module.exports = function setupApolloServer(app) {
  const server = new ApolloServer({
    typeDefs,
    resolvers,
    playground: true,
  });

  server.applyMiddleware({ app });
};
