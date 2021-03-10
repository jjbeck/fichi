require('dotenv').config();
const express = require('express');
const app = express();
const cookieParser = require('cookie-parser');
const { connectToDb } = require('./setup/db_connect.js');
const { installHandler } = require('./src/handlers/api_handler.js');
const bodyParser = require('body-parser');
const routes = require("./src/routes");

app.use(cookieParser());
routes.use(bodyParser.json());

app.use("/", routes);

installHandler(app);

const port = process.env.API_SERVER_PORT || 3000;

(async function start() {
  try {
    console.log("Connecting to MongoDB...");
    await connectToDb();
    console.log("MongoDB connected");
    app.listen(port, () => {
      console.log(`API server started on port ${port}`);
    });
  } catch (err) {
    console.log('ERROR:', err);
  }
}());
