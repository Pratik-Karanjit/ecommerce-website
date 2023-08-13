import { Schema } from "mongoose";


export let productsSchema = Schema({
  title: String,
  price: Number,
  description: String,
  quantity: Number,
});



