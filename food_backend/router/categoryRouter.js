import express from "express";
import {
  addCategory,
  getCategory,
  deleteCategory,
} from "../controllers/categoryContol.js";
import multer from "multer";

const categoryRouter = express.Router();

const upload = new multer.diskStorage({
  destination: "upload",
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}${file.originalname}`);
  },
});

const uploadCategory = multer({ storage: upload });

categoryRouter.post("/add", uploadCategory.single("image"), addCategory);
categoryRouter.get("/list", getCategory);
categoryRouter.delete("/delete", deleteCategory);

export default categoryRouter;
