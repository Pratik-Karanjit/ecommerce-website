import express, { json } from "express";
import { port } from "./src/config/constant.js";
import userRouter from "./src/Routes/userRouter.js";
import cors from "cors";
import connectDb from "./src/connectdb/connectdb.js";
import productRouter from "./src/Routes/productRouter.js";

let app = express();

app.use(json());

app.use(cors())
app.use("/users", userRouter);
app.use("/admin", productRouter);

connectDb();

app.use(express.static("./public"));


app.listen(port, () => {
  console.log(`app is listening at port ${port}`);
});
