import express from "express";
import auth from "../midelwer/auth.js";
import {
  addProd,
  removeProd,
  getProduct,
} from "../controllers/productControlers.js";

const routerItem = express.Router();

routerItem.post("/add", auth, addProd);
routerItem.post("/remove", auth, removeProd);
routerItem.post("/AllList", auth, getProduct);

export default routerItem;
