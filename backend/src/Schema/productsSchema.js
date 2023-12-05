// import { Schema } from "mongoose";


// export let productsSchema = Schema({
//   title: String,
//   price: Number,
//   description: String,
//   quantity: Number,
// });


import { Schema } from "mongoose";

export let productsSchema = Schema({
  title: String,
  price: Number,
  description: String,
  quantity: Number,
  feedback: [
    {
      user: String,
      message: String,
    },
  ],
  ratings: [
    {
      user: String,
      rating: Number,
    },
  ],
  averageRating: {
    type: Number,
    default: 0,
  },
});



