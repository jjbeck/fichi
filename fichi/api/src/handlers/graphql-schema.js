const neo4jgraphql = require('neo4j-graphql-js');
const fs = require('fs');
const path = require('path');

const typeDefs = fs.readFileSync(path.resolve(__dirname, './schema.graphql')).toString('utf-8');


module.exports = { typeDefs };
