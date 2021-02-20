require('dotenv').config();
const { response } = require('express');
const mongoose = require('mongoose');

async function connectToDb() {
  const url = process.env.DB_URL || 'mongodb://localhost/fichi';
  mongoose.connect('mongodb://localhost/fichi', { useNewUrlParser: true });
  mongoose.set('useFindAndModify', false);
  console.log('Connectd to MongoDB at', url);
}

module.exports = { connectToDb };