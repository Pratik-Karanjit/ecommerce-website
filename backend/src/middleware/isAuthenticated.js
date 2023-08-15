import expressAsyncHandler from "express-async-handler";
import { Token } from "../Schema/model.js";
import { verifyToken } from "../utils/token.js";

let isAuthenticated = expressAsyncHandler(async (req, res, next) => {
  let bearerToken = req.headers.authorization;
  let tokenArr = bearerToken.split(" ");

  let token = tokenArr[1];

  let _token = await Token.findOne({ token: token });

  if (!_token) {
    let error = new Error("Token is not valid");
    error.statusCode = 401;
    throw error;
  } else {
    let info = await verifyToken(token);

    req.info = info;
    req.token={
        token:token,
        tokenId:_token._id
    };

    next();
  }
});

export default isAuthenticated;
