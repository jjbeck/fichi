const mongoose = require('mongoose');


const userSchema = new mongoose.Schema({
  email: {
    type: String,
    validate: {
      validator: async email => await User.where({ email }).countDocuments() === 0,
      message: ({ value }) => `Email ${value} already exists`,
    },
  },
}, { timestamps: { createdAt: 'createdAt' } });

const userUpdate = new mongoose.Schema({
  fname: { type: String },
  coru: { type: Number },
  lname: { type: String },
  signUpDate: { type: Date },
  age: { type: Number },
});


const User = mongoose.model('Email', userSchema, 'userInfo');

const UserUpdate = mongoose.model('User', userUpdate, 'userInfo');

module.exports = { User, UserUpdate };
