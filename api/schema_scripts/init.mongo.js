/*
 * Run using the mongo shell. For remote databases, ensure that the
 * connection string is supplied in the command line. For example:
 * localhost:
 *   mongo issuetracker scripts/init.mongo.js
 * Atlas:
 *   mongo mongodb+srv://user:pwd@xxx.mongodb.net/issuetracker scripts/init.mongo.js
 * MLab:
 *   mongo mongodb://user:pwd@xxx.mlab.com:33533/issuetracker scripts/init.mongo.js
 */

let db;
db.userInfo.remove({});

const users = [
  {
    id: 1,
    signUpDate: new Date('2020-01-15'),
    email: 'jordan@gmail.com',
    fname: 'jordan',
    lname: 'becker',
    age: 26,
    coru: 0,
  },
  {
    id: 2,
    signUpDate: new Date('2017-01-15'),
    email: 'mauricio@gmail.com',
    fname: 'mauricio',
    lname: 'torrejon',
    age: 32,
    coru: 1,
  },
];

db.userInfo.insertMany(users);
const count = db.userInfo.count();

db.counters.remove({ _id: 'user' });
db.counters.insert({ _id: 'user', current: count });

db.userInfo.createIndex({ age: 1 });
db.userInfo.createIndex({ coru: 1 });
