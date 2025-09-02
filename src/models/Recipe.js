import { model, Schema } from 'mongoose';

const recipesSchema = new Schema(
  {
    title: {
      type: String,
      required: true,
    },
    category: {
      type: String,
      required: true,
    },
    owner: {
      type: Schema.Types.ObjectId,
      ref: 'User',
    },
    area: {
      type: String,
      required: false,
    },
    instructions: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    thumb: {
      type: String,
      required: false,
    },
    time: {
      type: String,
      required: false,
    },
    ingredients: [
      {
        id: {
          type: String,
          ref: 'Ingredient',
          required: true,
        },
        measure: { type: String, required: true },
      },
    ],
  },
  {
    timestamps: true,
    versionKey: false,
  },
);

const Recipes = model('Recipe', recipesSchema);
export default Recipes;
