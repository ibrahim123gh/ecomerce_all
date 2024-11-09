import express from "express";
import auth from "../midelwer/auth.js";
import {
  purchase,
  verify,
  getOrder,
  getAllProduct,
  updateOrder,
} from "../controllers/orderControles.js";

const orderRouter = express.Router();

orderRouter.post("/purch", auth, purchase);
orderRouter.post("/verify", verify);
orderRouter.post("/getOrder", auth, getOrder);
orderRouter.get("/list", getAllProduct);
orderRouter.post("/staus", updateOrder);

export default orderRouter;
