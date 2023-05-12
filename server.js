require('dotenv').config();
require('express-async-errors');

const express = require('express');
const app = express();
const PORT = 3000;
const connectDB = require('./db/connect');
const authRoute = require('./router/authRoute');
const jobsRoute = require('./router/jobsRoute');

app.use(express.json());

// routes
app.use("/api/v1/auth", authRoute);
app.use("/api/v1/jobs", jobsRoute);

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