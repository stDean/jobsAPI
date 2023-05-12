require('dotenv').config();
require('express-async-errors');

const express = require('express');
const app = express();
const PORT = 3000;
const connectDB = require('./db/connect');

const start = async () => {
  try {
    await connectDB(process.env.MONGO_URI);
    app.listen(PORT, () => {
      console.log(`Server is listerning on port: ${PORT}`)
    })
  } catch (error) {
    console.log(error.message)
  }
}

start();