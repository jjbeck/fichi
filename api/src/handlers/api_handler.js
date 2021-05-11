
const { ApolloServer } = require('apollo-server-express');
const { Neo4jGraphQL } = require('@neo4j/graphql');
const { makeAugmentedSchema } = require('neo4j-graphql-js');
const neo4j = require('neo4j-driver');

const { typeDefs } = require('./graphql-schema');
const { resolvers } = require('../resolvers/authentication');


const schema = makeAugmentedSchema({
  typeDefs,
  resolvers,
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
  context: ({ req }) => {
    return {
      driver,
      req,
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
