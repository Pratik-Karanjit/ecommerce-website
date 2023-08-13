import { Router } from "express";
import {
  createProduct,
  createUser,
  getAllProducts,
  getProductById,
  loginUser,
  logout,
  myProfile,
  readAllUser,
  updateProductQuantity,
  verifyEmail,
  // readUserDetails,
} from "../Controller/userController.js";
import isAuthenticated from "../middleware/isAuthenticated.js";
import isAuthenticatedForEmail from "../middleware/isAuthenticatedForEmail.js";
// import isAuthorized from "../middleware/isAuthorized.js";

let userRouter = Router();

userRouter.route("/").post(createUser).get(readAllUser);

userRouter.route("/verify-email").post(isAuthenticatedForEmail,verifyEmail);

userRouter.route("/login").post(loginUser);

userRouter.route("/my-profile").get(isAuthenticated,myProfile);

userRouter.route("/logout").delete(isAuthenticatedForEmail, logout);

userRouter.route('/products').get(getAllProducts);

userRouter.route('/products/:productId').get(getProductById);

userRouter.route('/products/create').post(createProduct);

userRouter.route('/update-product-quantities').post(updateProductQuantity);

// userRouter.route("/delete").delete(isAuthenticatedForEmail, isAuthorized(["superAdmin"]), deleteUser);

// userRouter.route("/:id").get(readUserDetails).patch(updateUser)
// .delete(isAuthenticated,isAuthorized,deleteUser);

export default userRouter;
