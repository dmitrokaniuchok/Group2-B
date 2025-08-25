import mongoose from 'mongoose';

const ingredientSchema = new mongoose.Schema({
  name: { type: String, required: true },
  desc: { type: String },
  img: { type: String },
});

export const Ingredient = mongoose.model("Ingredient",ingredientSchema);
