function validateEmail(info) {
    const errors = [];
    const result = Joi.validate(info, setUser);
    const { error } = result;
  
    const valid = error == null;
  
    if (!valid) errors.push('Please enter valid email');
  
    if (errors.length > 0) {
      throw new UserInputError('Invalid input(s)', { errors });
    }
  }

  module.exports = validateEmail;