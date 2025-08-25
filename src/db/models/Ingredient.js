import { model, Schema } from 'mongoose';

const ingredientSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
      unique: true,
      trim: true,
      lowercase: true,
    },
  },
  { versionKey: false, timestamps: false },
);

export const Ingredient = model('Ingredient', ingredientSchema);
