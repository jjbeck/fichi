const jwt = require('jsonwebtoken') 
const { compareSync, hashSync } = require('bcrypt');
const { OAuth2Client } = require('google-auth-library');

require('dotenv').config();

// Resolvers for authenticating user

const resolvers = {
  Mutation: {
    signup: (obj, args, context, info) => {
      args.password = hashSync(args.password, 10);
      const session = context.driver.session();
      return session
        .run(
          `MATCH (u:User {email: $email}) Return u LIMIT 1`,
          { email: args.email },
        )
        .then((res) => {
          if (res.records.length !== 0) {
              throw {
                  username: 'Email already exists',
                  status: 400
            }
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
              return {
                token: jwt.sign({ id, email }, process.env.JWT_SECRET, {
                  expiresIn: '30d',
                })
              };
            });
          }
          
        });
    },
    login: (obj, args, context, info) => {
        const session = context.driver.session();
        return session
          .run(
            `MATCH (u:User {email: $email}) Return u LIMIT 1`,
            { email: args.email },
          )
          .then((res) => {
            session.close();
            const { id, email, password } = res.records[0].get('u').properties;
            if (!compareSync(args.password, password)) {
              throw new Error('Authorization Error');
            }
            return {
              token: jwt.sign({ id, email }, process.env.JWT_SECRET, {
                expiresIn: '30d'
              })
            };
          });
      },
    googleSignup: async (obj, args, context, info) => {
        const session = context.driver.session();
        console.log(context.req.headers.googletoken);
        
        if (!context.req.headers.googletoken) {
            throw {
                username: 'Missing Token',
                status: 400
          }
        } else {
            try {
                const client = new OAuth2Client();
                let payload;
                const ticket = await client.verifyIdToken({ idToken: context.req.headers.googletoken });
                payload = ticket.getPayload();
                const { given_name: fname, family_name: lname, email: retEmail } = payload;
                const credentials = {
                    fname, lname, email: retEmail,
                  };
                return session
                .run(
                  `MATCH (u:User {email: $email}) Return u LIMIT 1`,
                  { email: retEmail },
                )
                .then((res) => {
                  if (res.records.length !== 0) {
                      throw {
                          username: 'Email already exists',
                          status: 400
                    }
                  } else {
                    return session
                    .run(
                      `CREATE (u:User) SET u += $credentials, u.id = randomUUID()
                       RETURN u`,
                      { credentials },
                    )
                    .then((res) => {
                      session.close();
                      return {
                        token: jwt.sign( credentials, process.env.JWT_SECRET, {
                          expiresIn: '30d',
                        })
                      };
                    });
                  }
                  
                });
                
              } catch (error) {
                throw {
                    message: 'Invalid Credential',
                    status: 403,
                }
              }
        }


    },
  },
};

module.exports = { resolvers };
