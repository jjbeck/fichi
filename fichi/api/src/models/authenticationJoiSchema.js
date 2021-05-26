const Joi = require('joi');

const signUpJoi = Joi.object().keys({
  email: Joi.string().email().label('Email'),
  password: Joi.string().regex(/^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/).options({
    language: {
      string: {
        regex: {
          base: 'Password must contain a minimum eight characters, at least one letter, one number and one special character',
        },
      },
    },
  }),
});


module.exports = { signUpJoi };
