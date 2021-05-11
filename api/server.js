require('dotenv').config();
const express = require('express');
const cookieParser = require('cookie-parser');

const { connectToDb } = require('./db.js');
const { installHandler } = require('./src/handlers/api_handler.js');
require('./src/auth/auth.js');
const auth = require('./src/auth/auth.js');


const app = express();

app.use(cookieParser());

app.use('/auth', auth.routes);

app.get('/', (req, res) => {
  res.status(200).send({ status: 'OK' });
});

installHandler(app);

const port = process.env.GRAPHQL_LISTEN_PORT || 8080;

app.listen(port, '0.0.0.0', () => {
  console.log(`GRAPHQL API listening on port ${port}`);
});
