const fs = require('fs');
const path = require('path');
require('dotenv').config();
const { ApolloServer } = require('apollo-server-express');
const user = require('../controllers/user.controller.js');

const resolvers = {
  Query: {
    getUser: user.getUser
  },
  Mutation: {
    createUser: user.createUser,
  }
};

const server = new ApolloServer({
  typeDefs: fs.readFileSync(path.resolve(__dirname, './schema.graphql'), 'utf-8'),
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

/*
1. Add validation to check for existing email in db
*/
