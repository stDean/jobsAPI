require('dotenv').config();
require('express-async-errors');

const express = require('express');
const app = express();
const PORT = 3000;
const connectDB = require('./db/connect');

// routers
const authRouter = require('./router/auth.router');
const jobsRouter = require('./router/jobs.router');

// error handlers
const NotFoundMiddleware = require('./middleware/route-not-found');
const ErrorsMiddleware = require('./middleware/error-handling');

app.use(express.json());

// routes
app.use("/api/v1/auth", authRouter);
app.use("/api/v1/jobs", jobsRouter);

app.use(NotFoundMiddleware);
app.use(ErrorsMiddleware);

const start = async () => {
  try {
    await connectDB(process.env.MONGO_URI);
    app.listen(PORT, () => {
      console.log(`Server is listening on port: ${PORT}`);
    })
  } catch (e) {
    console.log(e.message);
  }
}

start();