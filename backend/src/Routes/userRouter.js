import { Router } from "express";
import {
  createProduct,
  createUser,
  deleteProduct,
  feedback,
  getAllProducts,
  getProductById,
  loginUser,
  logout,
  readAllUser,
  updateProductQuantity,
  verifyEmail,
  // readUserDetails,
} from "../Controller/userController.js";
import isAuthenticatedForEmail from "../middleware/isAuthenticatedForEmail.js";
// import isAuthorized from "../middleware/isAuthorized.js";

let userRouter = Router();

userRouter.route("/").post(createUser).get(readAllUser);

userRouter.route("/verify-email").post(isAuthenticatedForEmail,verifyEmail);

userRouter.route("/login").post(loginUser);

userRouter.route("/logout").delete(isAuthenticatedForEmail, logout);

userRouter.route('/products').get(getAllProducts);

userRouter.route('/products/:productId').get(getProductById);

userRouter.route('/update-product-quantities').post(updateProductQuantity);

userRouter.get('/products/:id', getProductById);

userRouter.post('/feedback/:id', feedback)

userRouter.post('/products/create', createProduct);

userRouter.delete('/delete-products/:id', deleteProduct);

export default userRouter;
