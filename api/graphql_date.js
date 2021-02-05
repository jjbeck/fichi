const { GraphQLScalarType } = require('graphql');
const { Kind } = require('graphql/language');

const UserAquireDate = new GraphQLScalarType({
  name: 'UserAquireDate',
  description: 'A Date() type in GraphQL as scalar',
  serialize(value) {
    return value.toISOString();
  },
});

module.exports = UserAquireDate;
