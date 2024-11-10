import category from "../models/categryModels.js";
import fs from "fs";

const addCategory = async (req, res) => {
  const image = `${req.file.filename}`;
  const { name, description } = req.body;
  try {
    const categ = new category({ name, description, image });
    await categ.save();
    res.json({ success: true, message: "Upload Successfly" });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: "error" });
  }
};
const getCategory = async (req, res) => {
  try {
    const categ = await category.find({});
    res.json({ success: true, categ });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: "error" });
  }
};

const deleteCategory = async (req, res) => {
  try {
    console.log(req.body.id);
    const removeImage = await category.findById(req.body.id);
    fs.unlink(`upload/${removeImage.image}`,()=>{});
    
    const removeCategory = await category.findByIdAndDelete( req.body.id );

    res.json({ success: true, message: "Category deleted successfully" });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: "error" });
  }
}

export { addCategory, getCategory, deleteCategory };
