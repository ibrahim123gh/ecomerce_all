import mongoose from "mongoose";

export const connectDB = async () => {
  await mongoose
    .connect(
      "mongodb+srv://ibraghoura:rHlRFJ6bnj2t0yz8@cluster0.wpfqw.mongodb.net/food_delv?retryWrites=true&w=majority&appName=Cluster0"
    )
    .then(() => {
      console.log("Database connected successfully");
    })
    .catch((err) => {
      console.error("Database connection error:", err);
    });
};
