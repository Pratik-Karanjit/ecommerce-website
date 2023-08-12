import { model } from "mongoose";
import { usersSchema } from "./usersSchema.js";
import { tokensSchema } from "./tokensSchema.js";
import { productsSchema } from "./productsSchema.js";


export let User = model("User", usersSchema);
export let Token = model("Token", tokensSchema);
export let Product = model("Product", productsSchema);
