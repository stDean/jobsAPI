// const { CustomAPIError } = require('../errors');
const { StatusCodes } = require('http-status-codes');


const ErrorHandlerMiddleware = (err, req, res, next) => {
  let customError = {
    // set default
    statusCode: err.statusCode || StatusCodes.INTERNAL_SERVER_ERROR,
    msg: err.message || 'Something went wrong try again later',
  }

  // if (err instanceof CustomAPIError) {
  //   return res.status(err.statusCode).json({ msg: err.message });
  // }

  // VALIDATION WITH MONGOOSE
  // if error is validation error, then get the values in the errors into an array,
  // get a new array that contains the message from the object in the first array
  // join it to form the error message
  // error when a required value is not provided
  if (err.name === 'ValidationError') {
    customError.msg = Object.values(err.errors)
      .map(item => item.message)
      .join(',');
    customError.statusCode = 400
  }

  // duplicate error
  if (err.code && err.code === 11000) {
    customError.msg = `Duplicate value entered for ${Object.keys(err.keyValue)} field, please choose another value`
    customError.statusCode = 400
  }

  // error when id value in the params is wrong
  if (err.name === 'CastError') {
    customError.msg = `No item found with id : ${err.value}`
    customError.statusCode = 404
  }

  return res.status(customError.statusCode).json({ msg: customError.msg });
}


module.exports = ErrorHandlerMiddleware;