const jwt = require('jsonwebtoken') 
const { compareSync, hashSync } = require('bcrypt');
const { UserInputError } = require('apollo-server-express');
const { signUpJoi } = require('../models/authenticationJoiSchema');
require('dotenv').config();



// Resolvers for authenticating user


function signUp(obj, args, context, info) {
  
      const session = context.driver.session();
      console.log(args);
      const validate = signUpJoi.validate({email: args.email, password: args.password })
      
      if (validate.error) {
        throw new UserInputError('The credentails you entered do not meet the requirements. Please try ficing your email or password');
      }
      args.password = hashSync(args.password, 10);
      return session
        .run(
          `MATCH (u:User {email: $email}) Return u LIMIT 1`,
          { email: args.email },
        )
        .then((res) => {
          if (res.records.length !== 0) {
              throw new UserInputError(
                  'Email already exists. Try signing in.',
                 
              )
          } else {
            return session
            .run(
              `CREATE (u:User) SET u += $args, u.id = randomUUID()
               RETURN u`,
              { args }
            )
            .then((res) => {
              session.close();
              const { id, email } = res.records[0].get('u').properties;
              const signedIn = true;
              return {
                token: jwt.sign({ id, email, signedIn }, process.env.JWT_SECRET, {
                  expiresIn: '30d',
                }), 
                id,
               
              };
            });
          }
          
        });
}

function login(obj, args, context, info) {

const session = context.driver.session();
        console.log('worked');
        return session
          .run(
            `MATCH (u:User {email: $email}) Return u LIMIT 1`,
            { email: args.email },
          )
          .then((res) => {
            session.close();
            const { id, email, password } = res.records[0].get('u').properties;
            if (!compareSync(args.password, password)) {
              throw new UserInputError('Incorrect Password.');
            }
            return {
              token: jwt.sign({ id, email, signedIn: true }, process.env.JWT_SECRET, {
                expiresIn: '30d',
              })
            };
          });
}

function deleteUser(obj, args, context, info) {

}


module.exports = { signUp, login };
