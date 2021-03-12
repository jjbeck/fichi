const { OAuth2Client } = require('google-auth-library');
const jwt = require('jsonwebtoken');
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

async function authorize(req, res, next) {
    if (!JWT_SECRET) {
        res.status(500).send('Missing JWT_SECRET. Refusing to authenticate');
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
          res.status(403).send('Invalid Credentials');
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
}

async function authenticate(req, res, next) {
    const googleToken = req.cookies.jwt_google;
    const facebookToken = req.cookies.jwt_facebook;
    if (!googleToken && !facebookToken) {
        return { signedIn: false };
    }
    const credentials = googleToken ? jwt.verify(googleToken, JWT_SECRET) : jwt.verify(facebookToken, JWT_SECRET);
    
    if (credentials.signedIn === false) {
        res.status(500).send({ message: 'troule signing in user. Please try signing in again.'});
    } else {
        res.status(200).send(credentials);
    }
}

async function signOut(req, res, next) {
    res.clearCookie('jwt_google');
    res.clearCookie('jwt_facebook');
    res.json({ status: 'you have signed out user' });
}

async function unregister(req, res, next) {
    res.clearCookie('jwt_google');
    res.clearCookie('jwt_facebook');
    User.deleteOne({ email: req.body.email }, (err) => {
        if (err) res.status(400).send({ code: 400, message: err });
    });
    res.json({ status: 'you have deleted your account' });
}

module.exports = {
    signOut,
    authorize,
    authenticate,
    unregister
}