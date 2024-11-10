import mongoose from "mongoose";

const categryModels = new mongoose.Schema(
  {
    name: { type: String, required: true,lowercase:true },
    description: { type: String, required: true },
    image: { type: String, required: true },
  },
  { timestamps: true }
);

const category = mongoose.model("category", categryModels);

export default category;
