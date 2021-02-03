const express = require('express');
const { ApolloServer } = require('apollo-server-express');
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

function setUserInfo(_, { userInfo }) {
  return allUserInfo.push(userInfo);
}

function getUserInfo() {
  return allUserInfo;
}
const server = new ApolloServer({
    typeDefs: fs.readFileSync('./schema.graphql', 'utf-8'),
    resolvers,
})

const app = express();

app.use(express.static('public'));

server.applyMiddleware({ app, path: '/graphql' });

app.listen(3000, function() {
    console.log('API started n port 3000');
});