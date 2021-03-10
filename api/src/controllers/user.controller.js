const { User } = require('../models/user.js');
/* Change validator over to JOI */
const validateEmail = require('../common/validations/email.validation');

async function getUser(req, res, next ) {
  const rs = await User.find({});
  console.log("Getting ", rs.length, " users");
  res.send(rs);
}
async function createUser(_, { info }) {
  await validateEmail(info);
  const rs = Object.assign({}, info);
  console.log("Created user", /*some id from user*/);
  return User.create(rs);
}
async function deleteUser() {
  console.log("not implementation yet...");
};
async function updateUser() {
  console.log("not implementation yet...");
};

module.exports = { 
  getUser, 
  createUser,
  deleteUser,
  updateUser 
};


