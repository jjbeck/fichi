const Router = require('express');
const bodyParser = require('body-parser');
const { OAuth2Client } = require('google-auth-library');
const jwt = require('jsonwebtoken');
const axios = require('axios');
require('dotenv').config();
require('isomorphic-fetch');

const { User } = require('../models/user.js');

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
  const googleToken = req.cookies.jwt_google;
  const facebookToken = req.cookies.jwt_facebook;
  if (!googleToken && !facebookToken) return { signedIn: false };

  try {
    const credentials = googleToken ? jwt.verify(googleToken, JWT_SECRET) : jwt.verify(facebookToken, JWT_SECRET);
    return credentials;
  } catch (error) {
    return { errorMessage: error };
  }
}

routes.post('/signin', async (req, res) => {
  if (!JWT_SECRET) {
    res.status(500).send({ message: 'Missing JWT_SECRET. Refusing to authenticate' });
  }

  if (!req.body.google_token && !req.body.facebook_token) {
    res.status(400).send({ code: 400, message: 'Missing Token' });
  }

  if (req.body.google_token) {
    const googleToken = req.body.google_token;
    const client = new OAuth2Client();
    let payload;
    try {
      const ticket = await client.verifyIdToken({ idToken: googleToken });
      payload = ticket.getPayload();
    } catch (error) {
      res.status(403).send({ message: 'Invalid Credentials' });
    }
    const { given_name: fname, family_name: lname, email: retEmail } = payload;
    const credentials = {
      signedIn: true, fname, lname, email: retEmail,
    };
    const token = jwt.sign(credentials, JWT_SECRET);
    res.cookie('jwt_google', token, { httpOnly: true });
    res.json(credentials);

    User.count({ email: retEmail }, (err, count) => {
      if (err) res.status().send({ message: err });
      if (count > 0) {
        console.log('email exists signing in');
      } else {
        User.create(credentials);
      }
    });
  }

  if (req.body.facebook_token) {
    const facebookToken = req.body.facebook_token;
    
    axios.get(`https://graph.facebook.com/v8.0/me?fields=id%2cfirst_name%2clast_name%2cemail&access_token=${facebookToken}`)
      .then((response) => {
        const { data } = response;
        if (data.error) res.status(400).send({ code: 400, message: data.error.message });
        const { first_name: fname, last_name: lname, email: retEmail } = data;
        const credentials = {
          signedIn: true, fname, lname, email: retEmail,
        };
        credentials.facebookAuth = true;

        const token = jwt.sign(credentials, JWT_SECRET);
        res.cookie('jwt_facebook', token, { httpOnly: true });
        res.json(credentials);

        User.count({ email: retEmail }, (err, count) => {
          if (err) res.status().send({ message: err });
          if (count > 0) {
            console.log('email exists signing in');
          } else {
            User.create(credentials);
          }
        });
      });
  }
});

routes.post('/user', (req, res) => {
  const user = getUser(req);


  if (user.errorMessage) {
    res.status(400).send({ message: 'trouble signing in user. Please try signing in again.', error: user.errorMessage });
  } else {
    res.send(user);

  }
});

routes.post('/signout', async (req, res) => {
  res.clearCookie('jwt_google');
  res.clearCookie('jwt_facebook');
  res.json({ status: 'You have signed out.' });
});

routes.post('/deleteaccount', async (req, res) => {
  res.clearCookie('jwt_google');
  res.clearCookie('jwt_facebook');
  User.deleteOne({ email: req.body.email }, (err) => {
    if (err) res.status(400).send({ code: 400, message: err });
  });
  res.json({ status: 'You have deleted your account.' });
});

module.exports = { routes };
