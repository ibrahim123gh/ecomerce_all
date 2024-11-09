import foodModel from "../models/foodModel.js";
import fs from "fs";

const addData = async (req, res) => {
  const file_name_image = `${req.file.filename}`;

  try {
    const data = await foodModel.create({
      name: req.body.name,
      price: req.body.price,
      image: file_name_image,
      description: req.body.description,
      category: req.body.category,
    });

    res.json({ success: true, message: "Upload successful" });
    console.log("success");
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: `Upload failed: ${error.message}` });
  }
};

const listData = async (req, res) => {
  try {
    const data = await foodModel.find({});
    res.json(data);
  } catch (error) {
    console.log(error);
  }
};

const removeData = async (req, res) => {
  try{
    const remove = await foodModel.findById(req.body.id);
    fs.unlink(`upload/${remove.image}`,()=>{});

    const removeItems = await foodModel.findByIdAndDelete(req.body.id);
    res.json({success:true,message:"remove successfly"})

  }catch(error){
    console.log(error);
    res.json({ success: false, message: "faild to remove" });
  }
};

export { addData, listData ,removeData};
