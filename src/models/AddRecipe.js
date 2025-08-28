import mongoose from 'mongoose';

const recipeSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    description: String,
    cookingTime: { type: Number, required: true },
    calories: Number,
    category: { type: String, required: true },
    owner: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    ingredients: [
      {
        name: String,
        amount: String,
      },
    ],
    instructions: String,
    image: String,
  },
  { timestamps: true },
);

export default mongoose.model('AddRecipe', recipeSchema);
