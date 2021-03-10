const Joi = require('joi');

const setUser = Joi.object().keys({
  email: Joi.string().email().label('Email'),
  lname: Joi.string().regex(/^[a-zA-Z]+$/).options({
    language: {
      string: {
        regex: {
          base: 'Last name must only contain letters',
        },
      },
    },
  }),
  fname: Joi.string().regex(/^[a-zA-Z]+$/).options({
    language: {
      string: {
        regex: {
          base: 'First name must only contain letters',
        },
      },
    },
  }),
});


module.exports = { setUser };
