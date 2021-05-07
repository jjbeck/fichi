const fs = require('fs');
const path = require('path');
require('dotenv').config();
const { ApolloServer } = require('apollo-server-express');
const Joi = require('joi');
const info = require('./info.js');
const CalendarDate = require('../resolvers/calendarDate.js');

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
