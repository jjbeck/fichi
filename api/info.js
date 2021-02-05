const { UserInputError } = require('apollo-server-express');
const { getDb, getNextSequence } = require('./db.js');

async function getUserInfo() {
  const db = getDb();
  const userInfo = await db.collection('userInfo').find({}).toArray();
  return userInfo;
}

function validateUserInfo(info) {
  const errors = [];
  const emailExpression = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  const nameExpression = /^[a-zA-Z]+$/;

  const isValidEmail = emailExpression.test(String(info.email).toLowerCase());
  if (!isValidEmail) errors.push('Please enter a valid email');
 
  const isValidfName = nameExpression.test(String(info.fname).toLowerCase());
  if (!isValidfName) errors.push('Please only use letters when entering first name');

  const isValidlName = nameExpression.test(String(info.lname).toLowerCase());
  if (!isValidlName) errors.push('Please only use letters when entering lastname');

  if (errors.length > 0) {
    throw new UserInputError('Invalid input(s)', { errors });
  }
}

async function setUserInfo(_, { info }) {
  const db = getDb();
  validateUserInfo(info);
  const newInfo = Object.assign({}, info);
  newInfo.id = await getNextSequence('user');
  newInfo.signUpDate = new Date();
  const result = await db.collection('userInfo').insertOne(newInfo);
  const savedInfo = await db.collection('userInfo')
    .findOne({ _id: result.insertedId });
  return savedInfo;
}

module.exports = { getUserInfo, setUserInfo };
