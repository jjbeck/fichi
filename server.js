const express = require('express');
const { ApolloServer, UserInputError } = require('apollo-server-express');
const fs = require('fs');
const { getMaxListeners } = require('process');
const { GraphQLScalarType } = require('graphql');


allUserInfo = [{
    id: 1,
    email: 'jordanforemail', 
    fname: 'jordan', 
    lname: 'becker',
    age: 26,
}];

const UserAquireDate = new GraphQLScalarType({
    name: 'UserAquireDate',
    description: 'A Date() type in GraphQL as scalar',
    serialize(value) {
        return value.toISOString();
    },
});

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
  info.id = allUserInfo.length + 1;
  info.signUpDate = new Date();
  allUserInfo.push(info);
  return info;
}

function getUserInfo() {
  return allUserInfo;
}
const server = new ApolloServer({
    typeDefs: fs.readFileSync('./schema.graphql', 'utf-8'),
    resolvers,
    formatError: error => {
        console.log(error);
        return error;
    },
});

function validateUserInfo(info) {
    const errors = [];

    const emailExpression = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    const nameExpression = /^[a-zA-Z]+$/

    const isValidEmail =  emailExpression.test(String(info.email).toLowerCase());
    if (!isValidEmail) errors.push('Please enter a valid email');

    const isValidfName = nameExpression.test(String(info.fname).toLowerCase());
    if (!isValidfName) errors.push('Please only use letters when entering first name');

    const isValidlName = nameExpression.test(String(info.lname).toLowerCase());
    if (!isValidlName) errors.push('Please only use letters when entering lastname');

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