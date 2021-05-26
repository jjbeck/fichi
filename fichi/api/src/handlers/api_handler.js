
const { ApolloServer } = require('apollo-server-express');
const { makeAugmentedSchema } = require('neo4j-graphql-js');
const { AuthenticationError } = require('apollo-server-express');
const neo4j = require('neo4j-driver');
const jwt = require('jsonwebtoken') 

const { typeDefs } = require('./graphql-schema');
const { signUp, login: authLogin } = require('../resolvers/authentication');
const { createCalendarEvent } = require('../resolvers/calendarEvent');
require('dotenv').config();


const resolvers = {
  Mutation: {
    signup: signUp,
    login: authLogin,
    createcalendarevent: createCalendarEvent,
  },
};

const schema = makeAugmentedSchema({
  typeDefs,
  resolvers,
  config: {
    query: {
      exclude: ['AuthToken'],
    },
    mutation: {
      exclude: ['AuthToken'],
    },
  },
});

require('dotenv').config();


// const info = require('./info.js');
// const CalendarDate = require('../resolvers/calendarDate.js');

const driver = neo4j.driver(
  process.env.NEO4J_URI || 'bolt://localhost:7687',
  neo4j.auth.basic(
    process.env.NEO4J_USER || 'neo4j',
    process.env.NEO4J_PASSWORD || 'letmein',
  ),
);


/*
const resolvers = {
  Query: {
    getUserInfo: info.getUserInfo,
    getCalendarEvents: info.getCalendarEvents,
  },
  Mutation: {
    setUserInfo: info.setUserInfo,
    setCalendarEvent: info.setCalendarEvent,
    setCalendarEventUpdate: info.setCalendarEventUpdate,
  },
  CalendarDate,
};
*/

const server = new ApolloServer({
  context: ({ req, res }) => {
    const token = req.headers.authorization.replace(/^Bearer\s+/, "") || false;
    let userId;

    if (token) {
      try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      userId = decoded.id;
      } catch (e) {
        throw new AuthenticationError('Invalid token. Please restart browser and try again');
      }
    }
  
    return {
      driver,
      cypherParams: {
        userId,
      },
      req,
      res,
      token,
    };
  },
  // remove schema and uncomment typeDefs and resolvers above to use original (unaugmented) schema
  schema,
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
