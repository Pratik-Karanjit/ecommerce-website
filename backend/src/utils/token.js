import jwt from "jsonwebtoken";
import { secretKey } from "../config/constant.js";
import expressAsyncHandler from "express-async-handler";

export let verifyToken = expressAsyncHandler(async (token) => {
  let infoObj = await jwt.verify(token, secretKey);
  return infoObj;
});

// format of infoObj
// {
//     id:"...",
//     role:"...."

// }

// expiresInfo:{
//     expiresIn:"..."
// }
export let generateToken = expressAsyncHandler(async (infoObj, expireInfo) => {
  let token = await jwt.sign(infoObj, secretKey, expireInfo);
  return token;
});
