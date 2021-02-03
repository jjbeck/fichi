const express = require('express');
const { ApolloServer, UserInputError } = require('apollo-server-express');
const fs = require('fs');
const { getMaxListeners } = require('process');


allUserInfo = [{
    email: 'jordanforemail', 
    fname: 'jordan', 
    lname: 'becker',
    age: 26,
}];

const resolvers = {
    Query: {
        getUserInfo,
    },

    Mutation: {
        setUserInfo,
    },
};

function setUserInfo(_, { info }) {
  validateUserInfo(info);
  allUserInfo.push(info);
  return info;
}

function getUserInfo() {
  return allUserInfo;
}
const server = new ApolloServer({
    typeDefs: fs.readFileSync('./schema.graphql', 'utf-8'),
    resolvers,
})

function validateUserInfo(info) {
    console.log(info);
    const errors = [];
    const emailExpression = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

    const isValidEmail =  emailExpression.test(String(info.email).toLowerCase())
    if (!isValidEmail) errors.push('Please enter a valid email');

    if (errors.length > 0) {
        throw new UserInputError('Invalid input(s)', { errors });
    }
}

const app = express();

app.use(express.static('public'));

server.applyMiddleware({ app, path: '/graphql' });

app.listen(3000, function() {
    console.log('API started n port 3000');
});