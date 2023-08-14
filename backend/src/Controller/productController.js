import expressAsyncHandler from "express-async-handler";
import successResponse from "../helper/successResponse.js";
import { Product } from "../Schema/model.js";
import { HttpStatus } from "../config/constant.js";

export let myProducts = expressAsyncHandler(async (req, res, next) => {
    console.log("enterashdaspdajsdpajd###########")
    let userId = req.info.id;
  console.log(userId)
  let result = await Product.find({ userId });
    console.log(result)
    successResponse(res, HttpStatus.OK, "My products read successfully", result);
  });