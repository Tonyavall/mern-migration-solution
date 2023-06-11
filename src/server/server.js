const { startServerAndCreateNextHandler } = require('@as-integrations/next');
const { ApolloServer } = require('@apollo/server');
const { typeDefs, resolvers } = require('./schemas/index');

const server = new ApolloServer({
  resolvers,
  typeDefs,
});

/*
  This handler middleware integration passes the context from Next middleware found in the app dir to
  the graphql context where we will be able to make use of it in the third param of our resolvers.
  Our resolvers will also be able to use Next methods such as setting cookies.
  This means that when using these type of apollo integrations, our request will take form of whatever
  shape our client's framework request looks like.
*/
const handler = startServerAndCreateNextHandler(server, {
  context: async (nextRequest) => nextRequest,
});

module.exports = handler; // HANDLER TO BE EXPORTED FOR API ROUTES