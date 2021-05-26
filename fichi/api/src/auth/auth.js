const Router = require('express');
const bodyParser = require('body-parser');
const { OAuth2Client } = require('google-auth-library');
const jwt = require('jsonwebtoken');
const axios = require('axios');
require('dotenv').config();
require('isomorphic-fetch');


let { JWT_SECRET } = process.env;

if (!JWT_SECRET) {
  if (process.env.NODE_ENV !== 'production') {
    JWT_SECRET = 'jwtsecretwhileindevmode';
    console.log('Missing JWT_SECRET. Using unsafe dev secret');
  } else {
    console.log('Missing env var JWT_SECRET. Authentication failed');
  }
}

const routes = new Router();

routes.use(bodyParser.json());

function getUser(req) {
  const userToken = req.cookies.token;
  

  if (!userToken) return { signedIn: false };

  try {
    const credentials = jwt.verify(userToken, process.env.JWT_SECRET);
    return credentials;
  } catch (error) {
    return { errorMessage: error };
  }
}

routes.post('/user', (req, res) => {
  const user = getUser(req);
  console.log(user);

  if (user.errorMessage) {
    res.status(400).send({ message: 'trouble signing in user. Please try signing in again.', error: user.errorMessage });
  } else {
    res.json(user);
  }
});


module.exports = { routes };
