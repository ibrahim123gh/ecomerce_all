import mongoose from "mongoose";

const userModule = new mongoose.Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    dbCard: { type: Object, default: {} },
  },
  { timestamps: true, minimize: false }
);

const user = mongoose.model("user", userModule);

export default user;
