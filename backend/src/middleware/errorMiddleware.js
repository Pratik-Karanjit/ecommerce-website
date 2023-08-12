import { HttpStatus } from "../config/constant.js";

let errorMiddleware = (error, req, res, next) => {
  res.status(error.statusCode || HttpStatus.INTERNAL_SERVER_ERROR).json({
    success: false,
    message: error.message || "internal server error",
  });
};

export default errorMiddleware;
