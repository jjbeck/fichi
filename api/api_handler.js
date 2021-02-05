const fs = require('fs');
require('dotenv').config();
const { ApolloServer } = require('apollo-server-express');

const UserAquireDate = require('./graphql_date.js');
const info = require('./info.js');

const resolvers = {
  Query: {
    getUserInfo: info.getUserInfo,
  },
  Mutation: {
    setUserInfo: info.setUserInfo,
  },
  UserAquireDate,
};

const server = new ApolloServer({
  typeDefs: fs.readFileSync('schema.graphql', 'utf-8'),
  resolvers,
  formatError: (error) => {
    console.log(error);
    return error;
  },
});

function installHandler(app) {
  const enableCors = (process.env.ENABLE_CORS || 'true') === 'true';
  console.log('CORS setting:', enableCors);
  server.applyMiddleware({ app, path: '/graphql', cors: enableCors });
}

module.exports = { installHandler };
