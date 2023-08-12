import expressAsyncHandler from "express-async-handler";
import { Token } from "../Schema/model.js";
import { verifyToken } from "../utils/token.js";

let isAuthenticatedForEmail = expressAsyncHandler(async (req, res, next) => {
  // console.log("chiryo hai isAuthenticatedForEmail")
    let bearerToken = req.query.token;
    // console.log("***********" + bearerToken)
    let _token = await Token.findOne({ token: bearerToken });
    // console.log(_token)
    if (!_token) {
      let error = new Error("Token is not valid");
      error.statusCode = 401;
      throw error;
    } else {
        // console.log("here..................")
        // console.log(_token.token)
        try {
      var info = await verifyToken(_token.token);
            
        } catch (error) {
            error.message = "message is not valid"
            throw error;
        }
    
      req.info = info;
      req.token={
          token:_token.token,
          tokenId:_token._id
      };
  
      next();
    }
  });
export default isAuthenticatedForEmail