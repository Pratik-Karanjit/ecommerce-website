import expressAsyncHandler from "express-async-handler";

const isAuthorized = (roles) =>
  expressAsyncHandler((req, res, next) => {
    if (roles.includes(req.info.role) || req.info.role === 'admin') {
      next();
    } else {
      let error = new Error("Permission denied");
      error.statusCode = 403;
      throw error;
    }
  });

export default isAuthorized;
