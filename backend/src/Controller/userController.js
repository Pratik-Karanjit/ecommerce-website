import { HttpStatus, baseUrl } from "../config/constant.js";
import successResponse from "../helper/successResponse.js";
import expressAsyncHandler from "express-async-handler";
import { sendMail } from "../utils/sendMail.js";
import { comparePassword, hashPassword } from "../utils/hashing.js";
import { generateToken } from "../utils/token.js";
import { Token, User, Product } from "../Schema/model.js";

export let createUser = expressAsyncHandler(async (req, res, next) => {
  let data = req.body;                                      
  data.isVerify = false                                 
  data.isDeactivate = false                                 
  let email = data.email                                  
  let user = await User.findOne({ email:email });       
  
  if (user) {                                        
    let error = new Error("Duplicate email.");              
    error.statusCode = 409;
    throw error;
  }else{                                                  
    let _hashPassword = await hashPassword(data.password);
  data.password = _hashPassword;
  let result = await User.create(req.body);
  delete result._doc.password;                           
  let infoObj = {                                        
    id: result._id,
    role: result.role,
  };
  let expireInfo = {
    expiresIn: "1d",
  };
  let token = await generateToken(infoObj, expireInfo);   
  await Token.create({ token });
  let link = `${baseUrl}/verify-email?token=${token}`     
  await sendMail({
    from: '"Pratik Karanjit" <uniquekc425@gmail.com>',       
    to: [data.email],
    subject: "Email verification",
    html: `<h1>
    Verify Email 
    <a href = "${link}">Click to verify</a>               
    <h1>`,
  });
  successResponse(res, HttpStatus.CREATED, "User created successfully", result);
  }
  
});

export let verifyEmail = expressAsyncHandler(async (req, res, next) => {
  let id = req.info.id;   
  let tokenId = req.token.tokenId 
  let result = await User.findByIdAndUpdate(     
    id,
    { isVerify: true },  
    { new: true }      
  );
  await Token.findByIdAndDelete(tokenId)    

  successResponse(
    res,
    HttpStatus.CREATED,
    "Email verified successfully.",
    result
  );
});

export let loginUser = expressAsyncHandler(async (req, res, next) => {
  let email = req.body.email;         
  let password = req.body.password;   
  let data = await User.findOne({ email: email });
  if(data.isDeactivate) {
    await User.findByIdAndUpdate(data._id, {isDeactivate: false}); 
   }

  if (!data) {                      
    let error = new Error("Credential doesn't match");
    error.statusCode = 401;
    throw error;
  } else 
  {
    let isValidPassword = await comparePassword(password, data.password);  
    if (!isValidPassword) {                         
      let error = new Error("Credential doesn't match");
      error.statusCode = 401;
      throw error;
    } else {
      if (!data.isVerify) {                 

        let error = new Error("Please Verify Your Account First.");
        error.statusCode = 401;
        throw error;
      } else {                   
        let infoObj = {
          id: data._id,
          role: data.role,
        };
        let expireInfo = {
          expiresIn: "365d",
        };
        let token = await generateToken(infoObj, expireInfo);    
        await Token.create({ token });            
        res.json({ token });
        successResponse(res, HttpStatus.CREATED, "Login Successfully", token);
      }
    }
  }
});

export let logout = expressAsyncHandler(async (req, res, next) => {
  let tokenId = req.token.tokenId;
  let result = await Token.findByIdAndDelete(tokenId);
  successResponse(res, HttpStatus.OK, "logout successfully", result);
});


export let readUserDetails = expressAsyncHandler(async (req, res, next) => {
  let result = await User.findById(req.params.id);
  successResponse(res, HttpStatus.OK, "Read User details successfully", result);
});

export let readAllUser = expressAsyncHandler(async (req, res, next) => {
  try {
    let result = await User.find({ name: "nitan" });

    successResponse(res, HttpStatus.OK, "Read User  successfully", result);
  } catch (error) {
    errorResponse(res, HttpStatus.BAD_REQUEST, error.message);
  }
});

export let deleteUser = expressAsyncHandler(async (req, res, next) => {
  try {
    let result = await User.findByIdAndDelete(req.info.id);
    // console.log(result);
    successResponse(res, HttpStatus.OK, "Delete User successfully.", result);
  } catch (error) {
    error.statusCode = HttpStatus.BAD_REQUEST;
    next(error);
  }
});

export let updateUser = expressAsyncHandler(async (req, res, next) => {
  try {
    let result = await User.findByIdAndUpdate(req.params.id, req.body);
    successResponse(
      res,
      HttpStatus.CREATED,
      "Update User  successfully.",
      result
    );
  } catch (error) {
    error.statusCode = HttpStatus.BAD_REQUEST;
    next(error);
  }
});

export let createProduct = expressAsyncHandler(async (req, res, next) => {
  const { title, price, description, quantity } = req.body;

  try {
    const newProduct = await Product.create({ title, price, description,quantity });
    successResponse(res, HttpStatus.CREATED, 'Product created successfully', newProduct);
  } catch (error) {
    errorResponse(res, HttpStatus.INTERNAL_SERVER_ERROR, 'Error creating product');
  }
});


export const getAllProducts = expressAsyncHandler(async (req, res) => {
  try {
    const products = await Product.find();
    successResponse(res, HttpStatus.OK, 'Products fetched successfully', products);
  } catch (error) {
    errorResponse(res, HttpStatus.INTERNAL_SERVER_ERROR, 'Error fetching products');
  }
});



export const feedback = expressAsyncHandler(async (req, res) => {
  const productId = req.params.id;
  console.log(productId)
  const { user, message, rating } = req.body;

  try {
    const product = await Product.findById(productId);

    if (!product) {
      return errorResponse(res, HttpStatus.NOT_FOUND, 'Product not found');
    }

    // Add feedback and rating to the product
    product.feedback.push({ user, message });
    product.ratings.push({ user, rating });

    // Recalculate the average rating for the product
    const totalRatings = product.ratings.reduce((sum, rating) => sum + rating.rating, 0);
    product.averageRating = totalRatings / product.ratings.length;

    // Save the updated product
    await product.save();

    return successResponse(res, HttpStatus.CREATED, 'Feedback and rating added successfully');
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
});






export const getProductById = expressAsyncHandler(async (req, res) => {
  const { productId } = req.params;
  try {
    const product = await Product.findById(productId);
    if (product) {
      successResponse(res, HttpStatus.OK, 'Product fetched successfully', product);
    } else {
      errorResponse(res, HttpStatus.NOT_FOUND, 'Product not found');
    }
  } catch (error) {
    errorResponse(res, HttpStatus.INTERNAL_SERVER_ERROR, 'Error fetching product details');
  }
});


export const deleteProduct = expressAsyncHandler(async (req, res) => {
  const productId = req.params.id;

  try {
    const deletedProduct = await Product.findByIdAndRemove(productId);

    if (deletedProduct) {
      successResponse(res, HttpStatus.OK, 'Product deleted successfully', deletedProduct);
    } else {
      errorResponse(res, HttpStatus.NOT_FOUND, 'Product not found');
    }
  } catch (error) {
    errorResponse(res, HttpStatus.INTERNAL_SERVER_ERROR, 'Error deleting product');
  }
});


  export const updateProductQuantity = expressAsyncHandler(async (req, res) => {
    const updatedProducts = req.body;
    console.log(updatedProducts)

    try {
      for (const updatedProduct of updatedProducts) {
        const { _id, quantity } = updatedProduct;
        await Product.findByIdAndUpdate(_id, { $inc: { quantity: -quantity } });
      }
      successResponse(res, HttpStatus.OK, 'Product quantities updated successfully', { success: true });
    } catch (error) {
      console.error('Error updating product quantities:', error);
      errorResponse(res, HttpStatus.INTERNAL_SERVER_ERROR, 'An error occurred while updating product quantities.');
    }
  })

