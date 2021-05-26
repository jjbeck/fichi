const { UserInputError } = require('apollo-server-express');
const Joi = require('joi');


const { setUser } = require('../models/authenticationJoiSchema.js');
const { User } = require('../models/user.js');
const { Events } = require('../models/calendarEvent.js');

async function getUserInfo() {
  const userInfo = await User.find({});
  return userInfo;
}

async function getCalendarEvents() {
  const calendarEvents = await Events.find({});
  return calendarEvents;
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


async function setUserInfo(_, { info }) {
  await validateEmail(info);
  const newInfo = Object.assign({}, info);
  return User.create(newInfo);
}

async function setCalendarEvent(_, { event }) {
  const newEvent = Object.assign({}, event);
  return Events.create(newEvent);
}

async function setCalendarEventUpdate(_, {_id, changes }) {
  const changedEvent = Events.findByIdAndUpdate({_id}, changes,  {new: true});

  return changedEvent;
}


module.exports = {
  getUserInfo,
  setUserInfo,
  getCalendarEvents,
  setCalendarEvent,
  setCalendarEventUpdate,
};

/* Change validator over to JOI */
