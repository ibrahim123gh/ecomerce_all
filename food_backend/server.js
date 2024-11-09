import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import { connectDB } from "./config/db.js";
import router from "./router/foodRouter.js";
import userRouter from "./router/usersRouter.js";
import "dotenv/config"
import routerItem from "./router/productRouter.js"
import orderRouter from "./router/orderRouter.js"

const app = express();
app.use(cors()); 
app.use(express.json());

connectDB();

app.use("/api/food", router);
app.use("/images", express.static("upload"));
app.use("/api/user", userRouter);
app.use("/api/items", routerItem);
app.use("/api/order", orderRouter);

const port = 4000;
app.get("/", (req, res) => {
  res.send("Hello World");
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});