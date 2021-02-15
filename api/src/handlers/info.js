const { UserInputError } = require('apollo-server-express');
const Joi = require('joi');
const { getDb, getNextSequence } = require('../../db.js');

const { setUser, updateUser } = require('../models/joiSchema.js');
const { User, UserUpdate } = require('../models/user.js');

async function getUserInfo() {
  const db = getDb();
  const userInfo = await db.collection('userInfo').find({}).toArray();
  return userInfo;
}

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

function validateInfo(info) {
  const errors = [];


  const result = Joi.validate(info, updateUser, { abortEarly: false });
  const { value, error } = result;


  const valid = error === null;
  console.log(valid);
  let errorList;

  if (!valid) {
    errorList = error.details.map(x => x.message);
    errors.push(errorList);
  }

  if (errors.length > 0) {
    throw new UserInputError('Invalid input(s)', { errors });
  }
}

async function setUserInfo(_, { info }) {
  await validateEmail(info);
  const newInfo = Object.assign({}, info);
  return User.create(newInfo);
}

async function updateUserInfo(_, { email, changes }) {
  await validateInfo(changes);
  const doc = await UserUpdate.findOneAndUpdate({ email }, changes, { new: true });
  return doc;
}

module.exports = { getUserInfo, setUserInfo, updateUserInfo };

/* Change validator over to JOI */
