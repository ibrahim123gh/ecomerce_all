import express from "express";
import multer from "multer";
import {
  addData,
  listData,
  removeData,
} from "../controllers/foodControllers.js";

const router = express.Router();

const storage = multer.diskStorage({
  destination: "upload",
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}${file.originalname}`);
  },
});

const upload = multer({ storage: storage });

router.post("/add", upload.single("image"), addData);
router.get("/list", listData);
router.delete("/remove", removeData);

export default router;
