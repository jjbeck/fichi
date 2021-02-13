const Joi = require('joi');

const updateUser = Joi.object().keys({ 
  lname: Joi.string().regex(/^[a-zA-Z]+$/).options({
    language: {
      string: {
        regex: {
          base: 'Last name must only contain letters',
        },
      },
    },
  }),
  age: Joi.number(),
  coru: Joi.number().min(0).max(1).error(() => 'Creator or User must be 0 or 1'),
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

const setUser = Joi.object().keys({
  email: Joi.string().email().label('Email'),
});


module.exports = { setUser, updateUser };
