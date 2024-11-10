import mongoose from "mongoose";

const foodSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    price: { type: Number, required: true },
    description: { type: String, required: true },
    image: { type: String, required: true },
    category: {
      type: mongoose.Schema.ObjectId,
      ref: "category",
      required: true,
    },
  },
  { timestamp: true }
);

const foodModel = mongoose.models.food || mongoose.model("food", foodSchema);

export default foodModel;
