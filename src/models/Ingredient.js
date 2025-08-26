import mongoose from 'mongoose';

const ingredientSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    desc: { type: String, required: true },
    img: { type: String },
  },
  {
    timestamps: true,
    versionKey: false,
  },
);

export const Ingredient = mongoose.model('Ingredient', ingredientSchema);
