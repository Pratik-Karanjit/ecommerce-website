// Import necessary modules and dependencies
import { Router } from "express";
import isAuthenticatedForEmail from "../middleware/isAuthenticatedForEmail.js"
import isAuthorized from "../middleware/isAuthorized.js";
import isAuthenticated from "../middleware/isAuthenticated.js";
import { myProducts } from "../Controller/productController.js";
let productRouter = Router();


// Create a new product
// productRouter.route("/create-product").post(isAuthenticatedForEmail,isAuthorized(["admin"]),createProduct)

// Read product details
// productRouter.route("/:productId").get(isAuthenticatedForEmail,isAuthorized(["admin"]),getAllProducts)

productRouter.route("/my-products").get(isAuthenticated,myProducts)


// Update product details
// productRouter.route("/update/:productId").patch(isAuthenticatedForEmail,isAuthorized(["admin"]),updateProduct)

// Delete a product
// productRouter.route("/delete/:productId").delete(isAuthenticatedForEmail,isAuthorized(["admin"]),deleteProduct)

export default productRouter;
