const errorHandler = (err, req, res, next) => {
  let statusCode = res.statusCode === 200 ? 500 : res.statusCode;
  let message = err.message;
  let status = err.status || "error";

  if (err.name === " CastError" && err.kind === "ObjectId") {
    statusCode = 404;
    message = "Resource not found";
  }

  res.status(statusCode).json({
    status,
    message,
    stack: process.env.NODE_ENV === "production" ? null : errorHandler.stack,
  });
};

export default errorHandler;
