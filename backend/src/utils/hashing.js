import expressAsyncHandler from "express-async-handler";
import bcrypt from "bcrypt";

export let hashPassword = expressAsyncHandler(async (password) => {
  let hashedPassword = await bcrypt.hash(password, 10);
  return hashedPassword;
});

export let comparePassword = expressAsyncHandler(
  async (password, hashPassword) => {
    let isMatch = await bcrypt.compare(password, hashPassword);
    return isMatch;
  }
);
