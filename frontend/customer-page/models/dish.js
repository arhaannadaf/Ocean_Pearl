// models/Dish.js
import mongoose from "mongoose";

const DishSchema = new mongoose.Schema({
  dish_id: String,
  dish_name: String,
  category: String,
  type: String,
  cuisine: String,
  rating: Number,
  price: String,
  availability: String,
  tags: [String],
});

export default mongoose.models.Dish || mongoose.model("Dish", DishSchema);
